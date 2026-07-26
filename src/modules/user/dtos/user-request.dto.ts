import {
  IsEmail,
  IsString,
  IsStrongPassword,
  IsUUID,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { PaginationQueryDTO } from 'src/common/dtos/pagination-query.dto';

export class UserRequestDTO {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsStrongPassword({
    minLength: 6,
    minUppercase: 1,
    minLowercase: 1,
  })
  password: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  @IsUUID()
  roleId: string;
}

export class CreateUserRequestDTO extends UserRequestDTO {}

export class ListUserRequestDTO extends PaginationQueryDTO {}

export class UpdateUserRequestDTO extends PartialType(UserRequestDTO) {}
