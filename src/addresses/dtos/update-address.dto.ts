import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Uf } from '../enums/uf.enum';

export class UpdateAddressDto {
  @IsOptional()
  @IsString()
  cep: string;

  @IsOptional()
  @IsString()
  street: string;

  @IsOptional()
  @IsString()
  streetNumber: string;

  @IsOptional()
  @IsString()
  neighborhood: string;

  @IsOptional()
  @IsString()
  complement: string;

  @IsOptional()
  @IsString()
  city: string;

  @IsOptional()
  @IsEnum(Uf)
  uf: Uf;
}
