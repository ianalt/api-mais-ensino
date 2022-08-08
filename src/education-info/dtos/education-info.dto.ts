import { Expose } from 'class-transformer';
import { SchoolingLevel } from '../enums/schooling-level.enum';

export class EducationInfoDTO {
  @Expose()
  id: number;

  @Expose()
  schoolingLevel: SchoolingLevel;

  @Expose()
  courseName: string | null;

  @Expose()
  institutionName: string;

  @Expose()
  startYear: string;

  @Expose()
  conclusionYear: string | null;
}
