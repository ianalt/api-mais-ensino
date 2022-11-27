import { IsEnum, IsOptional, IsString } from 'class-validator';
import { State } from '../enums/state.enum';

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

  @IsEnum(State)
  state: State;
}
