import { Expose } from 'class-transformer';

export class BaseCategoryDTO {
  @Expose()
  id: number;

  @Expose()
  name: string;
}
