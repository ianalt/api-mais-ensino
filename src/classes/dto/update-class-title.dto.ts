import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateClassTitleDto {
  @IsNotEmpty({ message: 'O campo "Título" está vazio' })
  @IsString({ message: 'Digite um título válido' })
  title: string;
}
