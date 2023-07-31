import { Expose } from 'class-transformer';

export class BaseKnowledgeAreaDto {
  @Expose()
  id: number;

  @Expose()
  name: string;
}
