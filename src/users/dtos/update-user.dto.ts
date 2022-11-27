import { IsDate, IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { Role } from 'src/auth/enums/role.enum';
import { Ethnicity } from '../enums/ethnicity.enum';
import { Gender } from '../enums/gender.enum';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  role: Role;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  cpf: string;

  @IsOptional()
  @IsString()
  @IsDate()
  birthDate: Date;

  @IsOptional()
  @IsEnum(Ethnicity)
  ethnicity: Ethnicity;

  @IsOptional()
  @IsEnum(Gender)
  gender: Gender;
}
