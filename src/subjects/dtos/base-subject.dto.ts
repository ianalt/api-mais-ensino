import { Expose } from 'class-transformer';

export class BaseSubjectDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  description: string;
}
