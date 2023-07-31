import { Expose } from 'class-transformer';

export class BaseCategoryDto {
  @Expose()
  id: number;

  @Expose()
  name: string;
}
