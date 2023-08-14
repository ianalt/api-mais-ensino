import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class UpdateSubjectDto {
  @IsNotEmpty({ message: 'O campo "Nome" está vazio' })
  @IsString({ message: 'Digite um nome válido' })
  name: string;

  @IsOptional()
  @IsString({ message: 'Digite uma descrição válida' })
  description?: string;

  @IsNotEmpty({ message: 'Selecione uma área de conhecimento válida' })
  @IsInt({ message: 'Selecione uma área de conhecimento para a disciplina' })
  @IsPositive({
    message: 'Selecione uma área de conhecimento para a disciplina',
  })
  knowledgeAreaId: number;

  @IsNotEmpty({ message: 'Selecione um professor para a disciplina' })
  @IsInt({ message: 'Selecione um professor para a disciplina' })
  @IsPositive({ message: 'Selecione um professor para a disciplina' })
  teacherId: number;

  @IsInt({ each: true })
  @IsPositive({ each: true })
  monitorsIds: number[];
}
