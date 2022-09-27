import { Expose } from 'class-transformer';

export class BaseKnowledgeAreaDTO {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  description: string;
}
