import { Type } from 'class-transformer';
import { ArrayMaxSize, ValidateNested } from 'class-validator';
import { CreateAddressDto } from 'src/addresses/dtos/create-address.dto';
import { CreatePhoneNumberDto } from 'src/phone-numbers/dtos/create-phone-number.dto';
import { CreateFullUserDto } from './create-full-user.dto';

export class AddAdminDto {
  @ValidateNested()
  @Type(() => CreateFullUserDto)
  user: CreateFullUserDto;

  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;

  @ValidateNested({ each: true })
  @Type(() => CreatePhoneNumberDto)
  @ArrayMaxSize(2, {
    message: 'No máximo 2 números de telefone são permitidos',
  })
  phoneNumbers: CreatePhoneNumberDto[];
}
