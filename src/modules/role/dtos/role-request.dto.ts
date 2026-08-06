import { IsString } from 'class-validator';
import { PaginationQueryDTO } from '../../../common/dtos/pagination-query.dto';
import { PartialType } from '@nestjs/mapped-types';

export class RoleRequestDTO {
  @IsString()
  name: string;
}

export class CreateRoleRequestDTO extends RoleRequestDTO {}

export class ListRoleRequestDTO extends PaginationQueryDTO {}

export class UpdateRoleRequestDTO extends PartialType(RoleRequestDTO) {}
