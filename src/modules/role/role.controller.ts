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
import { RoleService } from './role.service';
import {
  CreateRoleRequestDTO,
  ListRoleRequestDTO,
  UpdateRoleRequestDTO,
} from './dtos/role-request.dto';
import {
  CreateRoleResponseDTO,
  FindByIdRoleResponseDTO,
  ListRoleResponseDTO,
  UpdateRoleResponseDTO,
} from './dtos/role-response.dto';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  async create(
    @Body() body: CreateRoleRequestDTO,
  ): Promise<CreateRoleResponseDTO> {
    return this.roleService.create(body);
  }

  @Get()
  async list(@Query() query: ListRoleRequestDTO): Promise<ListRoleResponseDTO> {
    return this.roleService.list(query);
  }

  @Get(':roleId')
  async findById(
    @Param('roleId', ParseUUIDPipe) roleId: string,
  ): Promise<FindByIdRoleResponseDTO> {
    return this.roleService.findById(roleId);
  }

  @Patch(':roleId')
  async update(
    @Param('roleId', ParseUUIDPipe) roleId: string,
    @Body() body: UpdateRoleRequestDTO,
  ): Promise<UpdateRoleResponseDTO> {
    return this.roleService.update(roleId, body);
  }

  @Delete(':roleId')
  async delete(@Param('roleId', ParseUUIDPipe) roleId: string) {
    return this.roleService.delete(roleId);
  }
}
