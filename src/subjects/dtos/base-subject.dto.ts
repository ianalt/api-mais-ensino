import { Expose } from 'class-transformer';

export class BaseSubjectDTO {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  description: string;
}
