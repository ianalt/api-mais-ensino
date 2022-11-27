import { Expose, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { BaseCategoryDto } from 'src/categories/dtos/base-category.dto';
import { BaseKnowledgeAreaDto } from 'src/knowledge-areas/dtos/base-knowledge-area.dto';
import { BaseUserDto } from 'src/users/dtos/base-user.dto';

export class SubjectDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  @ValidateNested({ each: true })
  @Type(() => BaseUserDto)
  users: BaseUserDto[];

  @Expose()
  @ValidateNested({ each: true })
  @Type(() => BaseKnowledgeAreaDto)
  knowledgeArea: BaseKnowledgeAreaDto;

  @Expose()
  @ValidateNested({ each: true })
  @Type(() => BaseCategoryDto)
  categories: BaseCategoryDto[];
}
