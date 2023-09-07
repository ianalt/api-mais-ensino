import { Type } from 'class-transformer';
import { ArrayMaxSize, ValidateNested } from 'class-validator';
import { UpdateAddressDto } from 'src/addresses/dtos/update-address.dto';
import { UpdatePhoneNumberDto } from 'src/phone-numbers/dtos/update-phone-number.dto';
import { UpdateFullUserDto } from './update-full-user.dto';

export class UpdateAdminDto {
  @ValidateNested()
  @Type(() => UpdateFullUserDto)
  user: UpdateFullUserDto;

  @ValidateNested()
  @Type(() => UpdateAddressDto)
  address: UpdateAddressDto;

  @ValidateNested({ each: true })
  @Type(() => UpdatePhoneNumberDto)
  @ArrayMaxSize(2, {
    message: 'No máximo 2 números de telefone são permitidos',
  })
  phoneNumbers: UpdatePhoneNumberDto[];
}
