import { Expose, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { SubjectWithCategoriesDto } from 'src/subjects/dtos/subject-with-categories.dto';

export class ClassOptionsDto {
  @Expose()
  @Type(() => SubjectWithCategoriesDto)
  @ValidateNested({ each: true })
  subjects: SubjectWithCategoriesDto[];
}
