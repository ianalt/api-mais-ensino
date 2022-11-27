import { IsOptional, IsString } from 'class-validator';

export class CreateKnowledgeAreaDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}
