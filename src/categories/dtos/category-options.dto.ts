import { Expose, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { BaseSubjectDto } from 'src/subjects/dtos/base-subject.dto';

export class CategoryOptionsDto {
  @Expose()
  @ValidateNested({ each: true })
  @Type(() => BaseSubjectDto)
  subjectOptions: BaseSubjectDto[];
}
