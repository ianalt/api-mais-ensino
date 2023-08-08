import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';

export class SubjectIdDto {
  @IsNotEmpty({ message: 'Selecione uma disciplina válida' })
  @IsInt({ message: 'Selecione uma disciplina válida' })
  @IsPositive({
    message: 'Selecione uma disciplina válida',
  })
  subjectId: number;
}
