import { Expose, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { FullCategoryInfoDto } from 'src/categories/dtos/full-category-info.dto';
import { BaseKnowledgeAreaDto } from 'src/knowledge-areas/dtos/base-knowledge-area.dto';
import { BaseUserDto } from 'src/users/dtos/base-user.dto';

export class FullSubjectInfoDto {
  @Expose()
  id: number;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  active: boolean;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  @ValidateNested({ each: true })
  @Type(() => BaseUserDto)
  users: BaseUserDto[];

  @Expose()
  @ValidateNested()
  @Type(() => BaseKnowledgeAreaDto)
  knowledgeArea: BaseKnowledgeAreaDto;

  @Expose()
  @ValidateNested({ each: true })
  @Type(() => FullCategoryInfoDto)
  categories: FullCategoryInfoDto[];
}
