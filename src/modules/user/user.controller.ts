import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  CreateUserRequestDTO,
  ListUserRequestDTO,
  UpdateUserRequestDTO,
} from './dtos/user-request.dto';
import {
  CreateUserResponseDTO,
  DeleteUserResponseDTO,
  FindUserResponseDTO,
  ListUserResponseDTO,
  UpdateUserResponseDTO,
} from './dtos/user-response.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(
    @Body() body: CreateUserRequestDTO,
  ): Promise<CreateUserResponseDTO> {
    return this.userService.create(body);
  }

  @Get()
  async list(@Query() query: ListUserRequestDTO): Promise<ListUserResponseDTO> {
    return this.userService.list(query);
  }

  @Get(':userId')
  async findById(
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<FindUserResponseDTO> {
    return this.userService.findById(userId);
  }

  @Patch(':userId')
  async update(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() body: UpdateUserRequestDTO,
  ): Promise<UpdateUserResponseDTO> {
    return this.userService.update(userId, body);
  }

  @Delete(':userId')
  async delete(
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<DeleteUserResponseDTO> {
    return this.userService.delete(userId);
  }
}
