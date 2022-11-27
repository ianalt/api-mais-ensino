import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreatePhoneNumberDto {
  @IsString()
  @MinLength(11)
  @MaxLength(11)
  phoneNumber: string;
}
