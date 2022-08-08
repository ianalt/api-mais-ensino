import { Expose, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { BaseCategoryDTO } from 'src/categories/dtos/base-category.dto';
import { BaseKnowledgeAreaDTO } from 'src/knowledge-areas/dtos/base-knowledge-area.dto';
import { BaseUserDTO } from 'src/users/dtos/base-user.dto';
import { SubjectOption } from '../enums/subject-option.enum';

export class SubjectDTO {
  @Expose()
  id: number;

  @Expose()
  name: SubjectOption;

  @Expose()
  description: string;

  @Expose()
  @ValidateNested({ each: true })
  @Type(() => BaseUserDTO)
  users: BaseUserDTO[];

  @Expose()
  @ValidateNested({ each: true })
  @Type(() => BaseKnowledgeAreaDTO)
  knowledgeArea: BaseKnowledgeAreaDTO;

  @Expose()
  @ValidateNested({ each: true })
  @Type(() => BaseCategoryDTO)
  categories: BaseCategoryDTO[];
}
