import { IsString, MaxLength } from 'class-validator';

export class CreatePhoneNumberDTO {
  @IsString()
  @MaxLength(12)
  phoneNumber: string;
}
