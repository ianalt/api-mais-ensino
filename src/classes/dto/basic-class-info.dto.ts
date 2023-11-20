import { Expose, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { CategoryWithSubjectDto } from 'src/categories/dtos/category-with-subject.dto';
import { BaseUserDto } from 'src/users/dtos/base-user.dto';

export class BasicClassInfoDto {
  @Expose()
  id: number;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  active: boolean;

  @Expose()
  title: string;

  @Expose()
  @Type(() => BaseUserDto)
  @ValidateNested()
  createdBy: BaseUserDto;

  @Expose()
  @Type(() => CategoryWithSubjectDto)
  @ValidateNested()
  category?: CategoryWithSubjectDto;
}
