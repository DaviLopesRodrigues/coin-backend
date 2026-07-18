import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create() {}

  @Get()
  async list() {}

  @Get()
  async find() {}

  @Patch()
  async update() {}

  @Delete()
  async delete() {}
}
