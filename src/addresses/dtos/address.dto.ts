import { Expose } from 'class-transformer';
import { Uf } from '../enums/uf.enum';

export class AddressDto {
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
  uf: Uf;
}
