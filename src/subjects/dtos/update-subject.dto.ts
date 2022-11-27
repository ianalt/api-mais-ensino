import { IsInt, IsOptional, IsPositive, IsString } from 'class-validator';

export class UpdateSubjectDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsInt()
  @IsPositive()
  knowledgeAreaId: number;
}
