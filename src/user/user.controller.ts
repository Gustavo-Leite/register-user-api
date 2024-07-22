import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserService } from './user.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DeleteUserDTO } from './dto/delete-user.dto';

@ApiTags('Users')
@Controller({ path: 'users', version: ['v1'] })
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a user' })
  @ApiResponse({ status: 201, description: 'Successfully requested.' })
  async create(@Body() { name, email, password }: CreateUserDTO) {
    return this.userService.create({ name, email, password });
  }

  @Get()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'List of users' })
  @ApiResponse({ status: 201, description: 'Successfully requested.' })
  async list() {
    return this.userService.list();
  }

  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'User delete' })
  @ApiResponse({ status: 201, description: 'Successfully requested.' })
  async delete(@Body() { id }: DeleteUserDTO) {
    return this.userService.delete(id);
  }
}
