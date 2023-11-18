import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';

export class UpdateClassCategoryDto {
  @IsNotEmpty({ message: 'Selecione uma categoria válida' })
  @IsInt({ message: 'Selecione uma categoria para a aula' })
  @IsPositive({
    message: 'Selecione uma categoria para a aula',
  })
  categoryId: number;
}
