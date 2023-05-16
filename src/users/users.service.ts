import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressesService } from 'src/addresses/addresses.service';
import { hashPassword } from 'src/auth/hashing';
import { EducationInfoService } from 'src/education-info/education-info.service';
import { FinancialInfoService } from 'src/financial-info/financial-info.service';
import { PhoneNumbersService } from 'src/phone-numbers/phone-numbers.service';
import { Repository } from 'typeorm';
import { AddAdminDto } from './dtos/add-admin.dto';
import { AddMonitorDto } from './dtos/add-monitor.dto';
import { AddStudentDto } from './dtos/add-student.dto';
import { AddTeacherDto } from './dtos/add-teacher.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,

    private addressesService: AddressesService,
    private phoneNumbersService: PhoneNumbersService,
    private educationInfoService: EducationInfoService,
    private financialInfoService: FinancialInfoService,
  ) {}

  private allRelations = [
    'address',
    'financialInfo',
    'tokens',
    'phoneNumbers',
    'educationInfoList',
    'comments',
    'subject',
  ];

  private mainRelations = [
    'address',
    'financialInfo',
    'phoneNumbers',
    'educationInfoList',
    'comments',
    'subject',
  ];

  async findById(id: number) {
    if (!id) return null;

    const user = await this.usersRepository.findOne({
      where: { id, active: true },
      relations: this.allRelations,
    });

    if (!user) throw new NotFoundException('User not found.');

    return user;
  }

  async findAll() {
    const users = await this.usersRepository.find({
      relations: this.allRelations,
    });

    if (!users) throw new NotFoundException('Users not found.');

    return users;
  }

  async findAllStudents() {
    const users = await this.usersRepository.find({
      where: { active: true, role: 'estudante' },
      relations: this.allRelations,
    });

    if (!users) throw new NotFoundException('Students not found.');

    return users;
  }

  async findAllMonitors() {
    const users = await this.usersRepository.find({
      where: { active: true, role: 'monitor' },
      relations: this.allRelations,
    });

    if (!users) throw new NotFoundException('Monitors not found.');

    return users;
  }

  async findAllTeachers() {
    const users = await this.usersRepository.find({
      where: { active: true, role: 'professor' },
      relations: this.allRelations,
    });

    if (!users) throw new NotFoundException('Teachers not found.');

    return users;
  }

  async findByCpf(cpf: string) {
    if (!cpf) return null;

    return await this.usersRepository.findOne({
      where: { cpf },
    });
  }

  async findByEmail(email: string) {
    if (!email) return null;

    return await this.usersRepository.findOne({
      where: { email },
    });
  }

  async create(body: CreateUserDto) {
    const { password, ...attrs } = body;

    const hashedPassword = await hashPassword(password);

    if (!hashedPassword)
      throw new BadRequestException('An error has occurred. Please try again.');

    const newUser = this.usersRepository.create({
      ...attrs,
      password: hashedPassword,
    });

    return this.usersRepository.save(newUser);
  }

  //TODO create DTO, change to return full user
  //TODO FIX ERROR ON THIS
  async addStudent(body: AddStudentDto) {
    const { user, address, phoneNumbers, educationInfoList, financialInfo } =
      body;

    const newUser = await this.create(user);

    const userId = newUser.id;

    const remainingInfo = await Promise.allSettled([
      this.addressesService.create(address, userId),

      this.financialInfoService.create(financialInfo, userId),
    ]);

    const educationList = await Promise.allSettled(
      educationInfoList.map((educationInfo) => {
        return this.educationInfoService.create(educationInfo, userId);
      }),
    );

    const rejectedEducationInfo = educationList.filter(
      (info) => info.status === 'rejected',
    );

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

    if (
      rejectedInfo.length > 0 ||
      rejectedPhoneNumbers.length > 0 ||
      rejectedEducationInfo.length > 0
    ) {
      await this.remove(newUser.id);

      return null;
    }

    const addedUser = await this.usersRepository.findOne({
      where: { id: userId },
      relations: this.mainRelations,
    });

    if (!addedUser) {
      await this.remove(newUser.id);

      return null;
    }

    return addedUser;
  }

  async addMonitor(body: AddMonitorDto) {
    const { user, address, phoneNumbers, educationInfoList } = body;

    const newUser = await this.create(user);

    const userId = newUser.id;

    const remainingInfo = await Promise.allSettled([
      this.addressesService.create(address, userId),
    ]);

    const educationList = await Promise.allSettled(
      educationInfoList.map((educationInfo) => {
        return this.educationInfoService.create(educationInfo, userId);
      }),
    );

    const rejectedEducationInfo = educationList.filter(
      (info) => info.status === 'rejected',
    );

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

    if (
      rejectedInfo.length > 0 ||
      rejectedPhoneNumbers.length > 0 ||
      rejectedEducationInfo.length > 0
    ) {
      await this.remove(newUser.id);

      return null;
    }

    const addedUser = await this.usersRepository.findOne({
      where: { id: userId },
      relations: this.mainRelations,
    });

    if (!addedUser) {
      await this.remove(newUser.id);

      return null;
    }

    return addedUser;
  }

  async addTeacher(body: AddTeacherDto) {
    const { user, address, phoneNumbers, educationInfoList } = body;

    const newUser = await this.create(user);

    const userId = newUser.id;

    const remainingInfo = await Promise.allSettled([
      this.addressesService.create(address, userId),
    ]);

    const educationList = await Promise.allSettled(
      educationInfoList.map((educationInfo) => {
        return this.educationInfoService.create(educationInfo, userId);
      }),
    );

    const rejectedEducationInfo = educationList.filter(
      (info) => info.status === 'rejected',
    );

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

    if (
      rejectedInfo.length > 0 ||
      rejectedPhoneNumbers.length > 0 ||
      rejectedEducationInfo.length > 0
    ) {
      await this.remove(newUser.id);

      return null;
    }

    const addedUser = await this.usersRepository.findOne({
      where: { id: userId },
      relations: this.mainRelations,
    });

    if (!addedUser) {
      await this.remove(newUser.id);

      return null;
    }

    return addedUser;
  }

  async addAdmin(body: AddAdminDto) {
    const { user, address, phoneNumbers } = body;

    const newUser = await this.create(user);

    const userId = newUser.id;

    const remainingInfo = await Promise.allSettled([
      this.addressesService.create(address, userId),
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
      await this.remove(newUser.id);

      return null;
    }

    const addedUser = await this.usersRepository.findOne({
      where: { id: userId },
      relations: this.mainRelations,
    });

    if (!addedUser) {
      await this.remove(newUser.id);

      return null;
    }

    return addedUser;
  }

  async update(id: number, body: UpdateUserDto) {
    const user = await this.findById(id);

    if (!user) throw new NotFoundException('User not found');

    const { password, ...values } = body;

    const attrs: Partial<User> = values;

    const hashedPassword = await hashPassword(password);

    if (!hashedPassword)
      throw new BadRequestException('An error has occurred. Please try again');

    user.updatedAt = new Date();
    user.password = hashedPassword;

    Object.assign(user, attrs);

    return this.usersRepository.save(user);
  }

  async delete(id: number) {
    const user = await this.findById(id);

    if (!user) throw new NotFoundException('User not found');

    user.updatedAt = new Date();
    user.active = false;

    return this.usersRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.findById(id);

    if (!user) throw new NotFoundException('User not found');

    return this.usersRepository.remove(user);
  }
}
