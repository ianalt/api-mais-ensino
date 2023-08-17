import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
} from 'class-validator';

export class UpdateCategoryDto {
  @IsBoolean()
  active: boolean;

  @IsNotEmpty({ message: 'O campo "Nome" está vazio' })
  @IsString({ message: 'Digite um nome válido' })
  name: string;

  @IsNotEmpty({ message: 'Selecione uma disciplina válida' })
  @IsInt({ message: 'Selecione uma disciplina para a categoria' })
  @IsPositive({
    message: 'Selecione uma disciplina para a categoria',
  })
  subjectId: number;
}
