import { IsEmail, IsString, IsStrongPassword } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
  @IsString()
  @ApiProperty({
    example: 'Josh Martin',
    description: 'The profile name',
  })
  name: string;

  @IsEmail()
  @ApiProperty({
    example: 'josh.martin@email.com',
    description: 'The profile email',
  })
  email: string;

  @IsStrongPassword({
    minLength: 6,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minLowercase: 1,
  })
  @ApiProperty({
    example: 'Josh10$',
    description: 'The profile password',
  })
  password: string;
}
