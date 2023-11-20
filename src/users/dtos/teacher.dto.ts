import { Expose, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { AddressDto } from 'src/addresses/dtos/address.dto';
import { Role } from 'src/auth/enums/role.enum';
import { EducationInfoDto } from 'src/education-info/dtos/education-info.dto';
import { PhoneNumberDto } from 'src/phone-numbers/dtos/phone-number.dto';
import { SubjectDto } from 'src/subjects/dtos/subject.dto';
import { Ethnicity } from '../enums/ethnicity.enum';
import { Gender } from '../enums/gender.enum';

export class TeacherDto {
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
  @ValidateNested({ each: true })
  @Type(() => AddressDto)
  address: AddressDto;

  @Expose()
  @ValidateNested({ each: true })
  @Type(() => PhoneNumberDto)
  phoneNumbers: PhoneNumberDto[];

  @Expose()
  @ValidateNested({ each: true })
  @Type(() => EducationInfoDto)
  educationInfoList: EducationInfoDto[];

  @Expose()
  @ValidateNested({ each: true })
  @Type(() => SubjectDto)
  subject: SubjectDto;
}
