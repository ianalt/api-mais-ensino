import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreatePhoneNumberDto {
  @IsNotEmpty({ message: 'O campo "Número de Celular" está vazio' })
  @IsString({ message: 'Digite um número de telefone válido' })
  @MinLength(11, { message: 'Digite um número de telefone válido' })
  @MaxLength(11, { message: 'Digite um número de telefone válido' })
  phoneNumber: string;
}
