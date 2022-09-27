import {
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { SchoolingLevel } from '../enums/schooling-level.enum';

export class CreateEducationInfoDTO {
  @IsEnum(SchoolingLevel)
  schoolingLevel: SchoolingLevel;

  @IsOptional()
  @IsString()
  courseName: string | null;

  @IsString()
  institutionName: string;

  @IsString()
  @MinLength(4)
  @MaxLength(4)
  startYear: string;

  @IsOptional()
  @IsString()
  @MinLength(4)
  @MaxLength(4)
  conclusionYear: string | null;
}
