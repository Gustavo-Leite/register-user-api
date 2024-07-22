import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { AuthUserDTO } from '../auth/dto/auth-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private issuer = 'login';
  private audience = 'users';

  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
  ) { }

  createToken(user: User) {
    const accessToken = this.jwtService.sign({
      id: user.id,
      name: user.name,
      email: user.email,
    }, {
      expiresIn: '10s',
      subject: String(user.id),
      issuer: this.issuer,
      audience: this.audience,
    });

    const refreshToken = this.jwtService.sign({
      id: user.id,
    }, {
      expiresIn: '20s',
      subject: String(user.id),
      issuer: this.issuer,
      audience: this.audience,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  checkToken(token: string) {
    try {
      const data = this.jwtService.verify(token, {
        issuer: this.issuer,
        audience: this.audience,
      });

      return data;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  isValidToken(token: string) {
    try {
      this.checkToken(token);
      return true;
    } catch (e) {
      return false;
    }
  }

  async validateUser({ email, password }: AuthUserDTO) {
    this.logger.debug(`Validating user with email: ${email}`);

    const user = await this.prisma.user.findFirst({ where: { email } });
    if (!user) {
      this.logger.debug(`User with email ${email} not found`);
      return null;
    }

    this.logger.debug(`User with email ${email} found`);

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      this.logger.debug(`Invalid password for user with email ${email}`);
      return null;
    }
    this.logger.debug(`User with email ${email} validated successfully`);

    return user;
  }

  async exists(id: number) {
    if (
      !(await this.prisma.user.count({
        where: {
          id,
        },
      }))
    ) {
      throw new NotFoundException(`O usuário ${id} não existe.`);
    }
  }

  refreshToken(refreshToken: string) {
    try {
      const data = this.jwtService.verify(refreshToken, {
        issuer: this.issuer,
        audience: this.audience,
      });

      const user = { id: data.id };
      return this.createToken(user as User);
    } catch (e) {
      throw new BadRequestException('Invalid refresh token');
    }
  }
}
