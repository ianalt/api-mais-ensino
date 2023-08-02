import { IsInt, IsOptional, IsPositive, IsString } from 'class-validator';

export class CreateSubjectDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsInt()
  @IsPositive()
  knowledgeAreaId: number;

  @IsInt()
  @IsPositive()
  teacherId: number;

  @IsInt({ each: true })
  @IsPositive({ each: true })
  monitorsIds: number[];
}
