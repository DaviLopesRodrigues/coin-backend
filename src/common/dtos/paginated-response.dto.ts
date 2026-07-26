import { Expose, Type } from 'class-transformer';
import { PaginationMetaDTO } from './pagination-meta.dto';

export class PaginatedResponseDTO<T> {
  @Expose()
  data: T[];

  @Expose()
  @Type(() => PaginationMetaDTO)
  meta: PaginationMetaDTO;
}