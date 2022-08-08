import { Expose, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { BaseKnowledgeAreaDTO } from 'src/knowledge-areas/dtos/base-knowledge-area.dto';
import { BaseUserDTO } from 'src/users/dtos/base-user.dto';
import { SubjectOption } from '../enums/subject-option.enum';

export class BaseSubjectDTO {
  @Expose()
  id: number;

  @Expose()
  name: SubjectOption;

  @Expose()
  description: string;
}
