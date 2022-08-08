import {
  IsDate,
  IsEmail,
  IsEnum,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Role } from 'src/auth/enums/role.enum';
import { Ethnicity } from '../enums/ethnicity.enum';
import { Gender } from '../enums/gender.enum';

export class CreateUserDTO {
  @IsEnum(Role)
  role: Role;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(16)
  password: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  cpf: string;

  @IsDate()
  birthDate: Date;

  @IsEnum(Ethnicity)
  ethnicity: Ethnicity;

  @IsEnum(Gender)
  gender: Gender;
}
