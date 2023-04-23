import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AddressesService } from 'src/addresses/addresses.service';
import { EducationInfoService } from 'src/education-info/education-info.service';
import { FinancialInfoService } from 'src/financial-info/financial-info.service';
import { PhoneNumbersService } from 'src/phone-numbers/phone-numbers.service';
import { TokensService } from 'src/tokens/tokens.service';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { SignUpDto } from './dtos/sign-up.dto';
import { Role } from './enums/role.enum';
import { comparePasswords } from './hashing';

@Injectable()
export class AuthService {
  constructor(
    private addressesService: AddressesService,
    private phoneNumbersService: PhoneNumbersService,
    private educationInfoService: EducationInfoService,
    private financialInfoService: FinancialInfoService,
    private usersService: UsersService,
    private tokensService: TokensService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user) return null;

    const passwordMatches = await comparePasswords(user.password, password);

    if (user && passwordMatches) {
      const { password, ...result } = user;

      return result;
    }

    return null;
  }

  generateToken(email: string, id: number, role: Role) {
    const payload = { email: email, sub: id, role: role };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signIn(user: User) {
    const { email, id, role } = user;

    const { access_token } = this.generateToken(email, id, role);

    const newToken = await this.tokensService.create({
      content: access_token,
      user: user,
    });

    if (!newToken) return null;

    return {
      access_token: newToken.content,
    };
  }

  async signUp(body: SignUpDto) {
    const { user, address, phoneNumbers, educationInfo, financialInfo } = body;

    const newUser = await this.usersService.create(user);

    const userId = newUser.id;

    const remainingInfo = await Promise.allSettled([
      this.addressesService.create(address, userId),

      this.financialInfoService.create(financialInfo, userId),

      this.educationInfoService.create(educationInfo, userId),
    ]);

    const phoneList = await Promise.allSettled(
      phoneNumbers.map((phoneNumber) => {
        return this.phoneNumbersService.create(phoneNumber, userId);
      }),
    );

    const rejectedInfo = remainingInfo.filter(
      (info) => info.status === 'rejected',
    );

    const rejectedPhoneNumbers = phoneList.filter(
      (phone) => phone.status === 'rejected',
    );

    if (rejectedInfo.length > 0 || rejectedPhoneNumbers.length > 0) {
      await this.usersService.remove(newUser.id);

      return null;
    }

    const newFinancialInfo = remainingInfo[1];

    const { firstName, email } = newUser;

    if (newFinancialInfo.status === 'fulfilled') {
      const financialInfo = newFinancialInfo.value;

      const { generalIncome } = financialInfo;

      if (generalIncome > 3000) {
        await this.usersService.delete(userId);

        return { firstName, email, status: 'Sujeito a avaliação' };
      }
    }

    return { firstName, email, status: 'Cadastro bem-sucedido' };
  }
}
