import { IsOptional, IsString } from 'class-validator';

export class UpdateKnowledgeAreaDTO {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}
