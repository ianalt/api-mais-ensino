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

  async seeding(body: SignUpDto[]) {
    for (const signUp of body) {
      const { user, address, phoneNumbers, educationInfo, financialInfo } =
        signUp;

      const newUser = await this.usersService.create(user);

      if (!newUser)
        throw new BadRequestException(
          'Um erro surgiu enquanto o cadastro era realizado. Por favor, tente novamente.',
        );

      const userId = newUser.id;

      const newAddress = await this.addressesService.create(address, userId);

      if (!newAddress)
        throw new BadRequestException(
          'Um erro surgiu enquanto o cadastro era realizado. Por favor, tente novamente.',
        );

      const newFinancialInfo = await this.financialInfoService.create(
        financialInfo,
        userId,
      );

      if (!newFinancialInfo)
        throw new BadRequestException(
          'Um erro surgiu enquanto o cadastro era realizado. Por favor, tente novamente.',
        );

      for (let i = 0; i < phoneNumbers.length; ++i) {
        const newPhoneNumber = await this.phoneNumbersService.create(
          phoneNumbers[i],
          userId,
        );

        if (!newPhoneNumber)
          throw new BadRequestException(
            'Um erro surgiu enquanto o cadastro era realizado. Por favor, tente novamente.',
          );
      }

      const newEducationInfo = await this.educationInfoService.create(
        educationInfo,
        userId,
      );

      if (!newEducationInfo)
        throw new BadRequestException(
          'Um erro surgiu enquanto o cadastro era realizado. Por favor, tente novamente.',
        );

      console.log('Usuário #' + newUser.id + ' = OK');
    }
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

    const rejectedInfo = remainingInfo.filter(
      (info) => info.status === 'rejected',
    );

    if (rejectedInfo.length > 0) {
      const [newAddress, newFinancialInfo, newEducationInfo] = remainingInfo;

      await Promise.allSettled([
        this.usersService.remove(newUser.id),
        newAddress.status === 'fulfilled'
          ? this.addressesService.remove(newAddress.value.id)
          : Promise.resolve(),
        newFinancialInfo.status === 'fulfilled'
          ? this.financialInfoService.remove(newFinancialInfo.value.id)
          : Promise.resolve(),
        newEducationInfo.status === 'fulfilled'
          ? this.educationInfoService.remove(newEducationInfo.value.id)
          : Promise.resolve(),
      ]);

      return null;
    }

    const phoneList = await Promise.allSettled(
      phoneNumbers.map((phoneNumber) => {
        return this.phoneNumbersService.create(phoneNumber, userId);
      }),
    );

    const rejectedPhoneNumbers = phoneList.filter(
      (phone) => phone.status === 'rejected',
    );

    const fulfilledPhoneNumbers = phoneList.filter(
      (phone) => phone.status === 'fulfilled',
    );

    if (rejectedPhoneNumbers.length > 0 && fulfilledPhoneNumbers.length > 0) {
      for (const phone of fulfilledPhoneNumbers) {
        if (phone.status === 'fulfilled')
          await this.phoneNumbersService.remove(phone.value.id);
      }
    }

    const newFinancialInfo = remainingInfo[1];

    const { firstName, email } = newUser;

    if (newFinancialInfo.status === 'fulfilled') {
      const financialInfo = newFinancialInfo.value;

      const { generalIncome, totalHouseHoldMembers } = financialInfo;

      if (generalIncome > 3000) {
        await this.usersService.delete(userId);

        return { firstName, email, status: 'Sujeito a avaliação' };
      }
    }

    return { firstName, email };
  }
}
