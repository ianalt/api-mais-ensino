import { Type } from 'class-transformer';
import { ArrayMaxSize, ValidateNested } from 'class-validator';
import { CreateAddressDTO } from 'src/users/addresses/dtos/create-address.dto';
import { CreateEducationInfoDTO } from 'src/users/education-info/dtos/create-education-info.dto';
import { CreateFinancialInfoDTO } from 'src/users/financial-info/dtos/create-financial-info.dto';
import { CreatePhoneNumberDTO } from 'src/users/phone-numbers/dtos/create-phone-number.dto';
import { CreateUserDTO } from 'src/users/dtos/create-user.dto';

export class SignUpDTO {
  @ValidateNested()
  @Type(() => CreateUserDTO)
  user: CreateUserDTO;

  @ValidateNested()
  @Type(() => CreateAddressDTO)
  address: CreateAddressDTO;

  @ValidateNested({ each: true })
  @Type(() => CreatePhoneNumberDTO)
  @ArrayMaxSize(2)
  phoneNumbers: CreatePhoneNumberDTO[];

  @ValidateNested({ each: true })
  @Type(() => CreateEducationInfoDTO)
  educationInfoList: CreateEducationInfoDTO[];

  @ValidateNested()
  @Type(() => CreateFinancialInfoDTO)
  financialInfo: CreateFinancialInfoDTO;
}
