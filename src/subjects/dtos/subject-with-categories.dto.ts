import { Expose, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { BaseCategoryDto } from 'src/categories/dtos/base-category.dto';

export class SubjectWithCategoriesDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  @Type(() => BaseCategoryDto)
  @ValidateNested({ each: true })
  categories: BaseCategoryDto[];
}
