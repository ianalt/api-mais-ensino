import { IsEnum, IsOptional, IsString } from 'class-validator';
import { SubjectOption } from '../enums/subject-option.enum';

export class UpdateSubjectDTO {
  @IsEnum(SubjectOption)
  name: SubjectOption;

  @IsOptional()
  @IsString()
  description: string;
}
