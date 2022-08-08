import { Expose } from 'class-transformer';
import { State } from '../enums/state.enum';

export class AddressDTO {
  @Expose()
  id: number;

  @Expose()
  cep: string;

  @Expose()
  street: string;

  @Expose()
  streetNumber: string;

  @Expose()
  neighborhood: string;

  @Expose()
  complement: string;

  @Expose()
  city: string;

  @Expose()
  state: State;
}
