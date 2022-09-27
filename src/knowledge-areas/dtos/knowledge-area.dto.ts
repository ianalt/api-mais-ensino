import { Expose, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { BaseSubjectDTO } from 'src/subjects/dtos/base-subject.dto';

export class KnowledgeAreaDTO {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  @ValidateNested({ each: true })
  @Type(() => BaseSubjectDTO)
  subjects: BaseSubjectDTO[];
}
