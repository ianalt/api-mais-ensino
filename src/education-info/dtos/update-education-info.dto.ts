import { IsOptional, IsString, IsDate } from 'class-validator';
import { SchoolingLevel } from '../enums/schooling-level.enum';

export class UpdateEducationInfoDto {
  @IsOptional()
  @IsString()
  schoolingLevel: SchoolingLevel;

  @IsOptional()
  @IsString()
  courseName: string | null;

  @IsOptional()
  @IsString()
  institutionName: string;

  @IsOptional()
  @IsDate()
  startYear: string;

  @IsOptional()
  @IsDate()
  conclusionYear: string | null;
}
