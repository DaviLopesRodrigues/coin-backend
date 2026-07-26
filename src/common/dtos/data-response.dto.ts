import { Expose } from 'class-transformer';

export class DataResponseDTO<T> {
  @Expose()
  data: T;
}