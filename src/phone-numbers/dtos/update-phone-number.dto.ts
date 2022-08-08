import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdatePhoneNumberDTO {
  @IsOptional()
  @IsString()
  @MaxLength(12)
  phoneNumber: string;
}
