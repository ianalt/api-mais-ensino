import { Expose, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { BaseSubjectDTO } from 'src/subjects/dtos/base-subject.dto';

export class BaseCategoryDTO {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  @ValidateNested({ each: true })
  @Type(() => BaseSubjectDTO)
  subject: BaseSubjectDTO;
}
