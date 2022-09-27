import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AddressesService } from 'src/users/addresses/addresses.service';
import { EducationInfoService } from 'src/users/education-info/education-info.service';
import { FinancialInfoService } from 'src/users/financial-info/financial-info.service';
import { PhoneNumbersService } from 'src/users/phone-numbers/phone-numbers.service';
import { TokensService } from 'src/tokens/tokens.service';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { SignUpDTO } from './dtos/sign-up.dto';
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

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    const passwordMatches = await comparePasswords(user.password, password);

    if (user && passwordMatches) {
      const { password, ...result } = user;

      return result;
    }

    return null;
  }

  generateToken(email: string, id: number) {
    const payload = { email: email, sub: id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signIn(user: User) {
    const { email, id } = user;

    const { access_token } = this.generateToken(email, id);

    const newToken = await this.tokensService.create({
      content: access_token,
      user: user,
    });

    if (!newToken)
      throw new ForbiddenException('Could not sign in. Please try again.');

    return {
      access_token: newToken.content,
    };
  }

  async seeding(body: SignUpDTO[]) {
    for (const signUp of body) {
      const { user, address, phoneNumbers, educationInfoList, financialInfo } =
        signUp;

      const newUser = await this.usersService.create(user);

      if (!newUser)
        throw new BadRequestException(
          'An error has occurred while trying to sign up. Please try again.',
        );

      const userID = newUser.id;

      const newAddress = await this.addressesService.create(address, userID);

      if (!newAddress)
        throw new BadRequestException(
          'An error has occurred while trying to sign up. Please try again.',
        );

      const newFinancialInfo = await this.financialInfoService.create(
        financialInfo,
        userID,
      );

      if (!newFinancialInfo)
        throw new BadRequestException(
          'An error has occurred while trying to sign up. Please try again.',
        );

      for (let i = 0; i < phoneNumbers.length; ++i) {
        const newPhoneNumber = await this.phoneNumbersService.create(
          phoneNumbers[i],
          userID,
        );

        if (!newPhoneNumber)
          throw new BadRequestException(
            'An error has occurred while trying to sign up. Please try again.',
          );
      }

      for (let i = 0; i < educationInfoList.length; ++i) {
        const newEducationInfo = await this.educationInfoService.create(
          educationInfoList[i],
          userID,
        );

        if (!newEducationInfo)
          throw new BadRequestException(
            'An error has occurred while trying to sign up. Please try again.',
          );
      }

      console.log('Usuário #' + newUser.id + ' = OK');
    }
  }

  async signUp(body: SignUpDTO): Promise<User> {
    const { user, address, phoneNumbers, educationInfoList, financialInfo } =
      body;

    const newUser = await this.usersService.create(user);

    if (!newUser)
      throw new BadRequestException(
        'An error has occurred while trying to sign up. Please try again.',
      );

    const userID = newUser.id;

    const newAddress = await this.addressesService.create(address, userID);

    if (!newAddress)
      throw new BadRequestException(
        'An error has occurred while trying to sign up. Please try again.',
      );

    const newFinancialInfo = await this.financialInfoService.create(
      financialInfo,
      userID,
    );

    if (!newFinancialInfo)
      throw new BadRequestException(
        'An error has occurred while trying to sign up. Please try again.',
      );

    for (let i = 0; i < phoneNumbers.length; ++i) {
      const newPhoneNumber = await this.phoneNumbersService.create(
        phoneNumbers[i],
        userID,
      );

      if (!newPhoneNumber)
        throw new BadRequestException(
          'An error has occurred while trying to sign up. Please try again.',
        );
    }

    for (let i = 0; i < educationInfoList.length; ++i) {
      const newEducationInfo = await this.educationInfoService.create(
        educationInfoList[i],
        userID,
      );

      if (!newEducationInfo)
        throw new BadRequestException(
          'An error has occurred while trying to sign up. Please try again.',
        );
    }

    return newUser;
  }
}
