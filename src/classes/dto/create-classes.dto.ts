import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateClassDto {
  @IsNotEmpty({ message: 'O campo "Título" está vazio' })
  @IsString({ message: 'Digite um título válido' })
  title: string;

  @IsNotEmpty({ message: 'Selecione uma categoria válida' })
  @IsInt({ message: 'Selecione uma categoria para a aula' })
  @IsPositive({
    message: 'Selecione uma categoria para a aula',
  })
  categoryId: number;
}
