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
import { SchoolingLevel } from '../enums/schooling-level.enum';

export class UpdateEducationInfoDto {
  //TODO opcional pq pode ser item novo ou já existente
  @IsOptional()
  @IsInt()
  @IsPositive()
  id?: number;

  @IsEnum(SchoolingLevel, {
    message: 'Selecione um nível de escolaridade da lista apresentada',
  })
  schoolingLevel: SchoolingLevel;

  @IsOptional()
  @IsString({ message: 'Digite um nome válido para o curso' })
  courseName: string | null;

  @IsString({ message: 'Digite um nome válido para a instituição de ensino' })
  institutionName: string;

  @IsNotEmpty({ message: 'O campo "Ano de Início" está vazio' })
  @IsString({ message: 'Digite um ano válido' })
  @MinLength(4, { message: 'Digite um ano de início válido' })
  @MaxLength(4, { message: 'Digite um ano de início válido' })
  startYear: string;

  @IsOptional()
  @IsString()
  @MinLength(4, { message: 'Digite um ano de conclusão válido' })
  @MaxLength(4, { message: 'Digite um ano de conclusão válido' })
  conclusionYear: string | null;
}
