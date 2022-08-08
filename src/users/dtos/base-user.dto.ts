import { Expose } from 'class-transformer';
import { Role } from 'src/auth/enums/role.enum';

export class BaseUserDTO {
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
}
