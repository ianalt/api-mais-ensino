import {
  ArrayNotEmpty,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateSubjectDto {
  @IsNotEmpty({ message: 'O campo "Nome" está vazio' })
  @IsString({ message: 'Digite um nome válido' })
  name: string;

  @IsOptional()
  @IsString({ message: 'Digite um descrição válida' })
  description?: string;

  @IsNotEmpty({ message: 'Selecione uma área de conhecimento válida' })
  @IsInt()
  @IsPositive()
  knowledgeAreaId: number;

  @IsNotEmpty({ message: 'Selecione um professor para a disciplina' })
  @IsInt()
  @IsPositive()
  teacherId: number;

  @ArrayNotEmpty({
    message: 'Selecione um ou mais monitores para a disciplina',
  })
  @IsInt({ each: true })
  @IsPositive({ each: true })
  monitorsIds: number[];
}
