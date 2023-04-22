import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Uf } from '../enums/uf.enum';

export class CreateAddressDto {
  @IsString()
  cep: string;

  @IsString()
  street: string;

  @IsString()
  streetNumber: string;

  @IsString()
  neighborhood: string;

  @IsOptional()
  @IsString()
  complement: string;

  @IsString()
  city: string;

  @IsEnum(Uf)
  uf: Uf;
}
