import { IsEnum, IsOptional, IsString } from 'class-validator';
import { KnowledgeAreaOption } from '../enums/knowledge-area-option.enum';

export class UpdateKnowledgeAreaDTO {
  @IsOptional()
  @IsEnum(KnowledgeAreaOption)
  name: KnowledgeAreaOption;

  @IsOptional()
  @IsString()
  description?: string;
}
