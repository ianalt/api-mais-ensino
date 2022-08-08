import { Expose, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { AddressDTO } from 'src/addresses/dtos/address.dto';
import { Role } from 'src/auth/enums/role.enum';
import { CommentDTO } from 'src/comments/dtos/comment.dto';
import { EducationInfoDTO } from 'src/education-info/dtos/education-info.dto';
import { FinancialInfoDTO } from 'src/financial-info/dtos/financial-info.dto';
import { PhoneNumberDTO } from 'src/phone-numbers/dtos/phone-number.dto';
import { BaseSubjectDTO } from 'src/subjects/dtos/base-subject.dto';
import { TokenDTO } from 'src/tokens/dtos/token.dto';
import { Ethnicity } from '../enums/ethnicity.enum';
import { Gender } from '../enums/gender.enum';

export class UserDTO {
  @Expose()
  id: number;

  @Expose()
  role: Role;

  @Expose()
  email: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  cpf: string;

  @Expose()
  birthDate: Date;

  @Expose()
  ethnicity: Ethnicity;

  @Expose()
  gender: Gender;

  @Expose()
  @ValidateNested()
  @Type(() => AddressDTO)
  address: AddressDTO;

  @Expose()
  @ValidateNested()
  @Type(() => FinancialInfoDTO)
  financialInfo: FinancialInfoDTO;

  @Expose()
  @ValidateNested({ each: true })
  @Type(() => PhoneNumberDTO)
  phoneNumbers: PhoneNumberDTO[];

  @Expose()
  @ValidateNested({ each: true })
  @Type(() => EducationInfoDTO)
  educationInfoList: EducationInfoDTO[];

  @Expose()
  @ValidateNested({ each: true })
  @Type(() => CommentDTO)
  comments: CommentDTO[];

  @Expose()
  @ValidateNested()
  @Type(() => BaseSubjectDTO)
  subject: BaseSubjectDTO;
}
