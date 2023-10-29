import { Expose, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { CategoryWithSubjectDto } from 'src/categories/dtos/category-with-subject.dto';
import { ClassFileDto } from 'src/class-files/dto/class-file.dto';
import { QuestionDto } from 'src/questions/dto/question.dto';
import { BaseUserDto } from 'src/users/dtos/base-user.dto';

export class ClassesDto {
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
  @Type(() => QuestionDto)
  @ValidateNested({ each: true })
  questions: QuestionDto[];

  @Expose()
  @Type(() => ClassFileDto)
  @ValidateNested({ each: true })
  classFiles: ClassFileDto[];

  @Expose()
  @Type(() => BaseUserDto)
  @ValidateNested({ each: true })
  createdBy: BaseUserDto;

  @Expose()
  @Type(() => CategoryWithSubjectDto)
  @ValidateNested({ each: true })
  category?: CategoryWithSubjectDto;
}
