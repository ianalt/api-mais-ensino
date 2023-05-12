import { Type } from 'class-transformer';
import { ArrayMaxSize, ValidateNested } from 'class-validator';
import { CreateAddressDto } from 'src/addresses/dtos/create-address.dto';
import { CreateEducationInfoDto } from 'src/education-info/dtos/create-education-info.dto';
import { CreateFinancialInfoDto } from 'src/financial-info/dtos/create-financial-info.dto';
import { CreatePhoneNumberDto } from 'src/phone-numbers/dtos/create-phone-number.dto';
import { CreateFullUserDto } from './create-full-user.dto';

export class AddStudentDto {
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

  @ValidateNested({ each: true })
  @Type(() => CreateEducationInfoDto)
  educationInfo: CreateEducationInfoDto;

  @ValidateNested()
  @Type(() => CreateFinancialInfoDto)
  financialInfo: CreateFinancialInfoDto;
}
