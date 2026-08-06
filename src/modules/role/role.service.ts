import {
  ConflictException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateRoleRequestDTO,
  ListRoleRequestDTO,
  UpdateRoleRequestDTO,
} from './dtos/role-request.dto';
import { plainToInstance } from 'class-transformer';
import {
  CreateRoleResponseDTO,
  DeleteRoleResponseDTO,
  FindByIdRoleResponseDTO,
  ListRoleResponseDTO,
  RoleResponseDTO,
  UpdateRoleResponseDTO,
} from './dtos/role-response.dto';
import { calculateTotalPages } from '../../common/calculate-total-pages';

@Injectable()
export class RoleService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateRoleRequestDTO): Promise<CreateRoleResponseDTO> {
    try {
      await this.findByName(data.name);

      const role = await this.prismaService.role.create({
        data,
      });

      const mappedRole = plainToInstance(RoleResponseDTO, role);

      return {
        data: mappedRole,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      console.error('[RoleService | create]:', error);

      throw new InternalServerErrorException('Falha ao cadastrar role.');
    }
  }

  async list(data: ListRoleRequestDTO): Promise<ListRoleResponseDTO> {
    const { limit, page } = data;
    try {
      const [roles, total] = await Promise.all([
        this.prismaService.role.findMany({
          skip: (page - 1) * limit,
          take: limit,
        }),
        this.prismaService.role.count(),
      ]);

      const mappedRoles = roles.map((role) => {
        return plainToInstance(RoleResponseDTO, role);
      });

      return {
        data: mappedRoles,
        meta: {
          page: page,
          limit: limit,
          total: total,
          totalPages: calculateTotalPages(total, limit),
        },
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      console.error('[RoleService | list]:', error);

      throw new InternalServerErrorException('Falha ao listar roles.');
    }
  }

  async findById(roleId: string): Promise<FindByIdRoleResponseDTO> {
    try {
      const role = await this.prismaService.role.findUnique({
        where: {
          id: roleId,
        },
      });

      if (!role) {
        throw new NotFoundException('Role não encontrada.');
      }

      const mappedRole = plainToInstance(RoleResponseDTO, role);

      return {
        data: mappedRole,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      console.error('[RoleService | find]:', error);

      throw new InternalServerErrorException('Falha ao buscar role.');
    }
  }

  async update(
    roleId: string,
    data: UpdateRoleRequestDTO,
  ): Promise<UpdateRoleResponseDTO> {
    try {
      const role = await this.prismaService.role.update({
        where: {
          id: roleId,
        },
        data: {
          name: data.name,
        },
      });

      const mappedRole = plainToInstance(RoleResponseDTO, role);

      return {
        data: mappedRole,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      console.error('[RoleService | update]:', error);

      throw new InternalServerErrorException('Falha ao atualizar role.');
    }
  }

  async delete(roleId: string): Promise<DeleteRoleResponseDTO> {
    try {
      await this.findById(roleId);

      const role = await this.prismaService.role.delete({
        where: {
          id: roleId,
        },
      });

      const mappedRole = plainToInstance(RoleResponseDTO, role);

      return {
        data: mappedRole,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      console.error('[RoleService | delete]:', error);

      throw new InternalServerErrorException('Falha ao deletar role.');
    }
  }

  private async findByName(name: string): Promise<void> {
    try {
      const role = await this.prismaService.role.findUnique({
        where: {
          name: name,
        },
      });

      if (role) {
        throw new ConflictException(
          'Role inválida. Tente novamente com outro nome.',
        );
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      console.error('[RoleService | findByName]:', error);

      throw new InternalServerErrorException('Falha ao buscar role por nome.');
    }
  }
}
