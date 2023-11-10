import { Expose, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { BaseSubjectDto } from 'src/subjects/dtos/base-subject.dto';

export class CategoryWithSubjectDto {
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
  @ValidateNested()
  @Type(() => BaseSubjectDto)
  subject: BaseSubjectDto;
}
