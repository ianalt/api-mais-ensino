import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdatePhoneNumberDto {
  @IsOptional()
  @IsString()
  @MaxLength(12)
  phoneNumber: string;
}
