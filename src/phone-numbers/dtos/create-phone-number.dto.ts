import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreatePhoneNumberDTO {
  @IsString()
  @MinLength(12)
  @MaxLength(12)
  phoneNumber: string;
}
