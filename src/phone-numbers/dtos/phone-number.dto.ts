import { Expose } from 'class-transformer';

export class PhoneNumberDto {
  @Expose()
  id: number;

  @Expose()
  phoneNumber: string;
}
