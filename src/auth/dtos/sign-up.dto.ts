import { Type } from 'class-transformer';
import { ArrayMaxSize, ValidateNested } from 'class-validator';
import { CreateAddressDto } from 'src/addresses/dtos/create-address.dto';
import { CreateEducationInfoDto } from 'src/education-info/dtos/create-education-info.dto';
import { CreateFinancialInfoDto } from 'src/financial-info/dtos/create-financial-info.dto';
import { CreatePhoneNumberDto } from 'src/phone-numbers/dtos/create-phone-number.dto';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';

export class SignUpDto {
  @ValidateNested()
  @Type(() => CreateUserDto)
  user: CreateUserDto;

  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;

  @ValidateNested({ each: true })
  @Type(() => CreatePhoneNumberDto)
  @ArrayMaxSize(2)
  phoneNumbers: CreatePhoneNumberDto[];

  @ValidateNested({ each: true })
  @Type(() => CreateEducationInfoDto)
  educationInfoList: CreateEducationInfoDto[];

  @ValidateNested()
  @Type(() => CreateFinancialInfoDto)
  financialInfo: CreateFinancialInfoDto;
}
