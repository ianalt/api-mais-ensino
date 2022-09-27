import { IsEnum } from 'class-validator';
import { Role } from 'src/auth/enums/role.enum';
import { CreateUserDTO } from './create-user.dto';

export class CreateFullUserDTO extends CreateUserDTO {
  @IsEnum(Role)
  role: Role;
}
