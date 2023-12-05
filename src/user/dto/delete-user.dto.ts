import { IsNumber } from 'class-validator';
import { CreateUserDTO } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';

export class DeleteUserDTO extends PartialType(CreateUserDTO) {
  @IsNumber()
  @ApiProperty({
    example: '1',
    description: 'The profile id',
  })
  id: number;
}
