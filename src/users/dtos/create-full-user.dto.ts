import { IsEnum } from 'class-validator';
import { Role } from 'src/auth/enums/role.enum';
import { CreateUserDto } from './create-user.dto';

export class CreateFullUserDto extends CreateUserDto {
  @IsEnum(Role)
  role: Role;
}
