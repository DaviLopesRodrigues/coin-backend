import { Exclude, Expose, Type } from 'class-transformer';
import { DataResponseDTO } from '../../../common/dtos/data-response.dto';
import { PaginatedResponseDTO } from '../../../common/dtos/paginated-response.dto';

export class RoleResponseDTO {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;
}

export class CreateRoleResponseDTO extends DataResponseDTO<RoleResponseDTO> {
  @Expose()
  @Type(() => RoleResponseDTO)
  declare data: RoleResponseDTO;
}

export class ListRoleResponseDTO extends PaginatedResponseDTO<RoleResponseDTO> {
  @Expose()
  @Type(() => RoleResponseDTO)
  declare data: RoleResponseDTO[];
}

export class FindByIdRoleResponseDTO extends DataResponseDTO<RoleResponseDTO> {
  @Expose()
  @Type(() => RoleResponseDTO)
  declare data: RoleResponseDTO;
}

export class UpdateRoleResponseDTO extends DataResponseDTO<RoleResponseDTO> {
  @Expose()
  @Type(() => RoleResponseDTO)
  declare data: RoleResponseDTO;
}

export class DeleteRoleResponseDTO extends DataResponseDTO<RoleResponseDTO> {
  @Expose()
  @Type(() => RoleResponseDTO)
  declare data: RoleResponseDTO;
}
