import {
  ConflictException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateUserRequestDTO,
  ListUserRequestDTO,
  UpdateUserRequestDTO,
} from './dtos/user-request.dto';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateUserResponseDTO,
  DeleteUserResponseDTO,
  FindUserResponseDTO,
  ListUserResponseDTO,
  UpdateUserResponseDTO,
  UserResponseDTO,
} from './dtos/user-response.dto';
import { plainToInstance } from 'class-transformer';
import { calculateTotalPages } from '../../common/calculate-total-pages';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateUserRequestDTO): Promise<CreateUserResponseDTO> {
    try {
      await this.findByEmail(data.email);

      const user = await this.prismaService.user.create({
        data,
        include: {
          role: true,
        },
      });

      const mappedUser = plainToInstance(UserResponseDTO, user);

      return {
        data: mappedUser,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      console.error('[UserService | create]:', error);

      throw new InternalServerErrorException('Falha ao cadastrar usuário.');
    }
  }

  async list(data: ListUserRequestDTO): Promise<ListUserResponseDTO> {
    const { limit, page } = data;
    try {
      const [users, total] = await Promise.all([
        this.prismaService.user.findMany({
          include: {
            role: true,
          },
          skip: (page - 1) * limit,
          take: limit,
        }),
        this.prismaService.user.count(),
      ]);

      const mappedUsers = users.map((user) => {
        return plainToInstance(UserResponseDTO, user);
      });

      return {
        data: mappedUsers,
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

      console.error('[UserService | list]:', error);

      throw new InternalServerErrorException('Falha ao listar usuários.');
    }
  }

  async findById(userId: string): Promise<FindUserResponseDTO> {
    try {
      const user = await this.prismaService.user.findFirst({
        where: {
          id: userId,
        },
        include: {
          role: true,
        },
      });

      if (!user) {
        throw new NotFoundException('Usuário não encontrado.');
      }

      const mappedUser = plainToInstance(UserResponseDTO, user);

      return {
        data: mappedUser,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      console.error('[UserService | find]:', error);

      throw new InternalServerErrorException('Falha ao buscar usuário.');
    }
  }

  async update(
    userId: string,
    data: UpdateUserRequestDTO,
  ): Promise<UpdateUserResponseDTO> {
    try {
      const user = await this.prismaService.user.update({
        where: {
          id: userId,
        },
        data: {
          email: data.email,
          password: data.password,
          firstName: data.firstName,
          lastName: data.lastName,
          roleId: data.roleId,
        },
        include: {
          role: true,
        },
      });

      const mappedUser = plainToInstance(UserResponseDTO, user);

      return {
        data: mappedUser,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      console.error('[UserService | update]:', error);

      throw new InternalServerErrorException('Falha ao editar usuário.');
    }
  }

  async delete(userId: string): Promise<DeleteUserResponseDTO> {
    try {
      await this.findById(userId);

      const user = await this.prismaService.user.delete({
        where: {
          id: userId,
        },
      });

      const mappedUser = plainToInstance(UserResponseDTO, user);

      return {
        data: mappedUser,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      console.error('[UserService | delete]:', error);

      throw new InternalServerErrorException('Falha ao deletar usuário.');
    }
  }

  private async findByEmail(email: string): Promise<void> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          email,
        },
        select: { id: true },
      });

      if (user) {
        throw new ConflictException(
          'E-mail inválido. Tente novamente com outro e-mail.',
        );
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      console.error('[UserService | findByEmail]:', error);

      throw new InternalServerErrorException(
        'Falha ao buscar usuário por e-mail.',
      );
    }
  }
}
