import { Expose, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { BaseClassesDto } from 'src/classes/dto/base-classes.dto';
import { BaseSubjectDto } from 'src/subjects/dtos/base-subject.dto';

export class CategoryDto {
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
  @ValidateNested({ each: true })
  @Type(() => BaseSubjectDto)
  subject: BaseSubjectDto;

  @Expose()
  @ValidateNested({ each: true })
  @Type(() => BaseClassesDto)
  classes: BaseClassesDto[];
}
