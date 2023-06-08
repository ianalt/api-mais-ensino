import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateKnowledgeAreaDto {
  @IsNotEmpty({ message: 'O campo "Nome" está vazio' })
  @IsString({ message: 'Digite um nome válido' })
  name: string;

  @IsOptional()
  @IsString({ message: 'Digite uma descrição válida' })
  description?: string;
}
