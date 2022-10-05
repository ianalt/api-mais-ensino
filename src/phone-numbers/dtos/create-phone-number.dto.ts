import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreatePhoneNumberDTO {
  @IsString()
  @MinLength(11)
  @MaxLength(11)
  phoneNumber: string;
}
