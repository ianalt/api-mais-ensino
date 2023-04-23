import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Ethnicity } from '../enums/ethnicity.enum';
import { Gender } from '../enums/gender.enum';

export class CreateUserDto {
  @IsNotEmpty({ message: 'O campo "E-mail" está vazio' })
  @IsString({ message: 'Digite um e-mail válido' })
  @IsEmail({}, { message: 'Digite um e-mail válido' })
  email: string;

  @IsNotEmpty({
    message: 'O campo "Senha" está vazio',
  })
  @IsString({
    message:
      'A senha precisa ter entre 8 e 16 caracteres, com 1 caracter minúsculo, 1 maísculo, 1 número e 1 caracter especial',
  })
  @MinLength(8, {
    message:
      'A senha precisa ter no mínimo 8 caracteres, com 1 caracter minúsculo, 1 maísculo, 1 número e 1 caracter especial',
  })
  @MaxLength(16, {
    message:
      'A senha pode ter no máximo 16 caracteres, com 1 caracter minúsculo, 1 maísculo, 1 número e 1 caracter especial',
  })
  password: string;

  @IsNotEmpty({
    message: 'O campo "Nome" está vazio',
  })
  @IsString({
    message: 'Digite um nome válido',
  })
  firstName: string;

  @IsNotEmpty({
    message: 'O campo "Sobrenome" está vazio',
  })
  @IsString({
    message: 'Digite um sobrenome válido',
  })
  lastName: string;

  @IsNotEmpty({
    message: 'O campo "CPF" está vazio',
  })
  @IsString({
    message: 'Digite um CPF válido',
  })
  @MinLength(11, {
    message: 'Digite um CPF válido',
  })
  @MaxLength(11, {
    message: 'Digite um CPF válido',
  })
  cpf: string;

  @IsNotEmpty({ message: 'O campo "Data de Nascimento" está vazio' })
  @IsDateString({}, { message: 'Digite uma data de nascimento válida' })
  birthDate: Date;

  @IsEnum(Ethnicity, { message: 'Selecione uma etnia da lista apresentada' })
  ethnicity: Ethnicity;

  @IsEnum(Gender, {
    message: 'Selecione uma identidade de gênero da lista apresentada',
  })
  gender: Gender;
}
