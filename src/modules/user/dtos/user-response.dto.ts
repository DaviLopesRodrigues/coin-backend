import { Exclude, Expose, Type } from 'class-transformer';
import { DataResponseDTO } from 'src/common/dtos/data-response.dto';
import { PaginatedResponseDTO } from 'src/common/dtos/paginated-response.dto';
import { RoleResponseDTO } from '../../role/dtos/role-response.dto';

export class UserResponseDTO {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Exclude()
  password: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Exclude()
  roleId: string;

  @Expose()
  @Type(() => RoleResponseDTO)
  role: RoleResponseDTO;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}

export class CreateUserResponseDTO extends DataResponseDTO<UserResponseDTO> {
  @Expose()
  @Type(() => UserResponseDTO)
  declare data: UserResponseDTO;
}

export class ListUserResponseDTO extends PaginatedResponseDTO<UserResponseDTO> {
  @Expose()
  @Type(() => UserResponseDTO)
  declare data: UserResponseDTO[];
}

export class FindUserResponseDTO extends DataResponseDTO<UserResponseDTO> {
  @Expose()
  @Type(() => UserResponseDTO)
  declare data: UserResponseDTO;
}

export class UpdateUserResponseDTO extends DataResponseDTO<UserResponseDTO> {
  @Expose()
  @Type(() => UserResponseDTO)
  declare data: UserResponseDTO;
}

export class DeleteUserResponseDTO extends DataResponseDTO<UserResponseDTO> {
  @Expose()
  @Type(() => UserResponseDTO)
  declare data: UserResponseDTO;
}
