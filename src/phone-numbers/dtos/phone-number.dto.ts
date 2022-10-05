import { Expose } from 'class-transformer';

export class PhoneNumberDTO {
  @Expose()
  id: number;

  @Expose()
  phoneNumber: string;
}
