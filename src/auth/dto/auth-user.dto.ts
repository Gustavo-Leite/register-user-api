import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthUserDTO {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    example: 'user.beta@email.com',
    description: 'The profile email',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'User000$',
    description: 'The profile password',
  })
  password: string;
}
