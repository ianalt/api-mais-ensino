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
}
