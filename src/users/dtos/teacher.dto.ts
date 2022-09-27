import { Expose, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { AddressDTO } from 'src/users/addresses/dtos/address.dto';
import { Role } from 'src/auth/enums/role.enum';
import { CommentDTO } from 'src/comments/dtos/comment.dto';
import { EducationInfoDTO } from 'src/users/education-info/dtos/education-info.dto';
import { PhoneNumberDTO } from 'src/users/phone-numbers/dtos/phone-number.dto';
import { SubjectDTO } from 'src/subjects/dtos/subject.dto';
import { Ethnicity } from '../enums/ethnicity.enum';
import { Gender } from '../enums/gender.enum';

export class TeacherDTO {
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
  @Type(() => AddressDTO)
  address: AddressDTO;

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
  @ValidateNested({ each: true })
  @Type(() => SubjectDTO)
  subject: SubjectDTO;
}
