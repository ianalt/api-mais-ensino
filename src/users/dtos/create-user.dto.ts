import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Ethnicity } from '../enums/ethnicity.enum';
import { Gender } from '../enums/gender.enum';

export class CreateUserDTO {
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

  @IsDateString()
  birthDate: Date;

  @IsEnum(Ethnicity)
  ethnicity: Ethnicity;

  @IsEnum(Gender)
  gender: Gender;
}
