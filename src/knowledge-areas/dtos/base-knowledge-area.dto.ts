import { Expose } from 'class-transformer';
import { KnowledgeAreaOption } from '../enums/knowledge-area-option.enum';

export class BaseKnowledgeAreaDTO {
  @Expose()
  id: number;

  @Expose()
  name: KnowledgeAreaOption;

  @Expose()
  description: string;
}
