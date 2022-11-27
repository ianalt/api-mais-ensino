import { IsEnum, IsOptional, IsString } from 'class-validator';
import { State } from '../enums/state.enum';

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
  @IsEnum(State)
  state: State;
}
