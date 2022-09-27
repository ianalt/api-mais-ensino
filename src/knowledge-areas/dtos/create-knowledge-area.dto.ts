import { IsOptional, IsString } from 'class-validator';

export class CreateKnowledgeAreaDTO {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}
