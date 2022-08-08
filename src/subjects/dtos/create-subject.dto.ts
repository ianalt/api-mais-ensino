import { IsEnum, IsString } from 'class-validator';
import { SubjectOption } from '../enums/subject-option.enum';

export class CreateSubjectDTO {
  @IsEnum(SubjectOption)
  name: SubjectOption;

  @IsString()
  description: string;
}
