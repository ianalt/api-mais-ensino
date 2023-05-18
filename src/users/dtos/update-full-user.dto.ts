import { IsBoolean, IsEnum } from 'class-validator';
import { Role } from 'src/auth/enums/role.enum';
import { UpdateUserDto } from './update-user.dto';

export class UpdateFullUserDto extends UpdateUserDto {
  //TODO talvez tirar o role, já que nunca usuarios terão seus acessos facilmente trocados
  @IsEnum(Role)
  role: Role;

  @IsBoolean()
  active: boolean;
}
