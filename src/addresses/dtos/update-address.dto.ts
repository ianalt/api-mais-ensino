import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Uf } from '../enums/uf.enum';

export class UpdateAddressDto {
  @IsInt()
  @IsPositive()
  id: number;

  @IsNotEmpty({ message: 'O campo "CEP" está vazio' })
  @IsString({ message: 'Digite um CEP válido' })
  @MinLength(8, {
    message: 'Digite um CEP válido',
  })
  @MaxLength(8, {
    message: 'Digite um CEP válido',
  })
  cep: string;

  @IsNotEmpty({ message: 'O campo "Rua" está vazio' })
  @IsString({ message: 'Digite uma rua válida' })
  street: string;

  @IsNotEmpty({ message: 'O campo "Número" está vazio' })
  @IsString({ message: 'Digite um número de rua válido' })
  streetNumber: string;

  @IsNotEmpty({ message: 'O campo "Bairro" está vazio' })
  @IsString({ message: 'Digite um bairro válido' })
  neighborhood: string;

  @IsOptional()
  @IsString({ message: 'Digite um complemento válido' })
  complement: string;

  @IsNotEmpty({ message: 'O campo "Cidade" está vazio' })
  @IsString({ message: 'Digite uma cidade válida' })
  city: string;

  @IsEnum(Uf, { message: 'Selecione uma UF da lista apresentada' })
  uf: Uf;
}
