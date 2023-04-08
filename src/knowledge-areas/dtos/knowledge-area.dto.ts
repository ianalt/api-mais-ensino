import { Expose, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { BaseSubjectDto } from 'src/subjects/dtos/base-subject.dto';

export class KnowledgeAreaDto {
  @Expose()
  id: number;

  @Expose()
  active: boolean;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  @ValidateNested({ each: true })
  @Type(() => BaseSubjectDto)
  subjects: BaseSubjectDto[];
}
