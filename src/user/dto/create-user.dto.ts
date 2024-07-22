import { IsEmail, IsString, IsStrongPassword } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
  @IsString()
  @ApiProperty({
    example: 'User Beta',
    description: 'The profile name',
  })
  name: string;

  @IsEmail()
  @ApiProperty({
    example: 'user.beta@email.com',
    description: 'The profile email',
  })
  email: string;

  @IsStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minLowercase: 1,
  })
  @ApiProperty({
    example: 'User000$',
    description: 'The profile password',
  })
  password: string;
}
