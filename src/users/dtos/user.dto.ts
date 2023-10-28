import { Expose, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { AddressDto } from 'src/addresses/dtos/address.dto';
import { Role } from 'src/auth/enums/role.enum';
import { EducationInfoDto } from 'src/education-info/dtos/education-info.dto';
import { FinancialInfoDto } from 'src/financial-info/dtos/financial-info.dto';
import { PhoneNumberDto } from 'src/phone-numbers/dtos/phone-number.dto';
import { BaseSubjectDto } from 'src/subjects/dtos/base-subject.dto';
import { Ethnicity } from '../enums/ethnicity.enum';
import { Gender } from '../enums/gender.enum';
import { BaseQuestionDto } from 'src/questions/dto/base-question.dto';
import { BaseAnswerDto } from 'src/answers/dto/base-answer.dto';

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  active: boolean;

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
  @Type(() => AddressDto)
  address: AddressDto;

  @Expose()
  @ValidateNested()
  @Type(() => FinancialInfoDto)
  financialInfo: FinancialInfoDto;

  @Expose()
  @ValidateNested({ each: true })
  @Type(() => PhoneNumberDto)
  phoneNumbers: PhoneNumberDto[];

  @Expose()
  @ValidateNested({ each: true })
  @Type(() => EducationInfoDto)
  educationInfoList: EducationInfoDto[];

  @Expose()
  @ValidateNested()
  @Type(() => BaseSubjectDto)
  subject: BaseSubjectDto;

  @Expose()
  @ValidateNested()
  @Type(() => BaseQuestionDto)
  createdQuestions: BaseQuestionDto[];

  @Expose()
  @ValidateNested()
  @Type(() => BaseAnswerDto)
  createdAnswers: BaseAnswerDto[];
}
