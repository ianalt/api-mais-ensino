import { IsInt, IsOptional, IsPositive, IsString } from 'class-validator';

export class CreateSubjectDTO {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsInt()
  @IsPositive()
  knowledgeAreaID: number;
}
