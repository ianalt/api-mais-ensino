import { Expose, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { BaseSubjectDTO } from 'src/subjects/dtos/base-subject.dto';
import { KnowledgeAreaOption } from '../enums/knowledge-area-option.enum';

export class KnowledgeAreaDTO {
  @Expose()
  id: number;

  @Expose()
  name: KnowledgeAreaOption;

  @Expose()
  description: string;

  @Expose()
  @ValidateNested({ each: true })
  @Type(() => BaseSubjectDTO)
  subjects: BaseSubjectDTO[];
}
