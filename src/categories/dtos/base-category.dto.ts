import { Expose, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { BaseSubjectDto } from 'src/subjects/dtos/base-subject.dto';

export class BaseCategoryDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  @ValidateNested({ each: true })
  @Type(() => BaseSubjectDto)
  subject: BaseSubjectDto;
}
