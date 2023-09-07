import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class ChangePasswordDto {
  @IsNotEmpty({
    message: 'O campo "Senha Atual" está vazio',
  })
  currentPassword: string;

  @IsNotEmpty({
    message: 'O campo "Nova Senha" está vazio',
  })
  @IsString({
    message:
      'A nova senha precisa ter entre 8 e 16 caracteres, com 1 caracter minúsculo, 1 maísculo, 1 número e 1 caracter especial',
  })
  @MinLength(8, {
    message:
      'A nova senha precisa ter no mínimo 8 caracteres, com 1 caracter minúsculo, 1 maísculo, 1 número e 1 caracter especial',
  })
  @MaxLength(16, {
    message:
      'A nova senha deve ter no máximo 16 caracteres, com 1 caracter minúsculo, 1 maísculo, 1 número e 1 caracter especial',
  })
  newPassword: string;

  @IsNotEmpty({
    message: 'O campo "Confirmar Nova Senha" está vazio',
  })
  newPasswordConfirmation: string;
}
