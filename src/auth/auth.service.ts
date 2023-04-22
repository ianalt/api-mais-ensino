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

    try {
      const newUser = await this.usersService.create(user);

      if (!newUser)
        throw new BadRequestException(
          'Um erro surgiu enquanto o cadastro era realizado. Por favor, tente novamente.',
        );

      const userId = newUser.id;

      const newAddress = await this.addressesService.create(address, userId);

      const newFinancialInfo = await this.financialInfoService.create(
        financialInfo,
        userId,
      );

      let phoneNumberError = false;
      const newPhoneNumbersList = [];
      for (const phoneNumber of phoneNumbers) {
        const newPhoneNumber = await this.phoneNumbersService.create(
          phoneNumber,
          userId,
        );

        if (!newPhoneNumber) phoneNumberError = true;

        newPhoneNumbersList.push(newPhoneNumber);
      }

      const newEducationInfo = await this.educationInfoService.create(
        educationInfo,
        userId,
      );

      if (
        !newAddress ||
        !newFinancialInfo ||
        !newEducationInfo ||
        phoneNumberError
      ) {
        await this.addressesService.remove(newAddress.id);
        await this.financialInfoService.remove(newFinancialInfo.id);
        await this.educationInfoService.remove(newEducationInfo.id);

        for (const newPhoneNumber of newPhoneNumbersList) {
          await this.phoneNumbersService.remove(newPhoneNumber.id);
        }

        await this.usersService.remove(userId);

        throw new UnprocessableEntityException(
          'Um erro surgiu enquanto o cadastro era realizado. Por favor, tente novamente.',
        );
      }

      return newUser;
    } catch (error) {
      console.log(error.message);
    }
  }
}
