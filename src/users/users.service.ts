import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
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
import { UpdateAdminDto } from './dtos/update-admin.dto';
import { UpdateFullUserDto } from './dtos/update-full-user.dto';
import { UpdateMonitorDto } from './dtos/update-monitor.dto';
import { UpdateStudentDto } from './dtos/update-student.dto';
import { UpdateTeacherDto } from './dtos/update-teacher.dto';
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

  async findOne(id: number) {
    if (!id) return null;

    const user = await this.usersRepository.findOne({
      where: { id, active: true },
      relations: this.allRelations,
    });

    if (!user) throw new NotFoundException('User not found.');

    return user;
  }

  async findById(id: number) {
    if (!id || id <= 0) return null;

    const user = await this.usersRepository.findOne({
      where: { id },
      relations: this.mainRelations,
    });

    if (!user) throw new NotFoundException('Usuário não encontrado');

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

  async updateStudent(id: number, body: UpdateStudentDto) {
    const { address, educationInfoList, financialInfo, phoneNumbers, user } =
      body;

    const existingEduInfo = educationInfoList.filter((info) => info.id);
    const newEduInfo = educationInfoList.filter((info) => !info.id);

    if (existingEduInfo.length <= 0 && newEduInfo.length <= 0)
      throw new UnprocessableEntityException(
        'Não foi possível atualizar o usuário (dados educacionais incorretos)',
      );

    if (existingEduInfo.length <= 0)
      await this.educationInfoService.removeAllFromUser(id);

    if (newEduInfo.length > 0) {
      const newEduInfoList = await Promise.all(
        newEduInfo.map(async (item) => {
          const newInfo = await this.educationInfoService.createForManage(
            item,
            id,
          );

          if (!newInfo)
            throw new UnprocessableEntityException(
              'Não foi possível atualizar o usuário (dados educacionais incorretos)',
            );
        }),
      );

      if (!newEduInfoList)
        throw new UnprocessableEntityException(
          'Não foi possível atualizar o usuário (dados educacionais incorretos)',
        );
    }

    if (existingEduInfo.length > 0) {
      const updatedExistingEduList = await Promise.all(
        existingEduInfo.map(async (item) => {
          const { id, ...values } = item;

          const updatedExistingInfo = await this.educationInfoService.update(
            id,
            values,
          );

          if (!updatedExistingInfo)
            throw new UnprocessableEntityException(
              'Não foi possível atualizar o usuário (dados educacionais incorretos)',
            );
        }),
      );

      if (!updatedExistingEduList)
        throw new UnprocessableEntityException(
          'Não foi possível atualizar o usuário (dados educacionais incorretos)',
        );
    }

    const existingPhones = phoneNumbers.filter((info) => info.id);
    const newPhone = phoneNumbers.filter((info) => !info.id);

    if (existingPhones.length <= 0 && newPhone.length <= 0)
      throw new UnprocessableEntityException(
        'Não foi possível atualizar o usuário (dados para contato incorretos)',
      );

    if (existingPhones.length <= 0)
      await this.phoneNumbersService.removeAllFromUser(id);

    if (newPhone.length > 0) {
      const updatedNewPhoneList = await Promise.all(
        newPhone.map(async (item) => {
          const newPhone = await this.phoneNumbersService.createNewInstance(
            item,
            id,
          );

          const newInfo = await this.phoneNumbersService.create(newPhone, id);

          if (!newInfo)
            throw new UnprocessableEntityException(
              'Não foi possível atualizar o usuário (dados para contato incorretos)',
            );
        }),
      );

      if (!updatedNewPhoneList)
        throw new UnprocessableEntityException(
          'Não foi possível atualizar o usuário (dados para contato incorretos)',
        );
    }

    if (existingPhones.length > 0) {
      const updatedExistingPhonesList = await Promise.all(
        existingPhones.map(async (item) => {
          const { id, ...values } = item;

          const updatedExistingInfo = await this.phoneNumbersService.update(
            id,
            values,
          );

          if (!updatedExistingInfo)
            throw new UnprocessableEntityException(
              'Não foi possível atualizar o usuário (dados para contato incorretos)',
            );
        }),
      );

      if (!updatedExistingPhonesList)
        throw new UnprocessableEntityException(
          'Não foi possível atualizar o usuário (dados para contato incorretos)',
        );
    }

    const remainingInfo = await Promise.all([
      await this.addressesService.update(address.id, address),
      await this.financialInfoService.update(financialInfo.id, financialInfo),
    ]);

    if (!remainingInfo)
      throw new UnprocessableEntityException(
        'Não foi possível atualizar o usuário (dados pessoais preenchidos incorretamente)',
      );

    const updatedUserInfo = await this.editUser(user, id);

    if (!updatedUserInfo)
      throw new UnprocessableEntityException(
        'Não foi possível atualizar o usuário (dados pessoais preenchidos incorretamente)',
      );

    return updatedUserInfo;
  }

  async updateMonitor(id: number, body: UpdateMonitorDto) {
    const { address, educationInfoList, phoneNumbers, user } = body;

    const existingEduInfo = educationInfoList.filter((info) => info.id);
    const newEduInfo = educationInfoList.filter((info) => !info.id);

    if (existingEduInfo.length <= 0 && newEduInfo.length <= 0)
      throw new UnprocessableEntityException(
        'Não foi possível atualizar o usuário (dados educacionais incorretos)',
      );

    if (existingEduInfo.length <= 0)
      await this.educationInfoService.removeAllFromUser(id);

    if (newEduInfo.length > 0) {
      const newEduInfoList = await Promise.all(
        newEduInfo.map(async (item) => {
          const newInfo = await this.educationInfoService.createForManage(
            item,
            id,
          );

          if (!newInfo)
            throw new UnprocessableEntityException(
              'Não foi possível atualizar o usuário (dados educacionais incorretos)',
            );
        }),
      );

      if (!newEduInfoList)
        throw new UnprocessableEntityException(
          'Não foi possível atualizar o usuário (dados educacionais incorretos)',
        );
    }

    if (existingEduInfo.length > 0) {
      const updatedExistingEduList = await Promise.all(
        existingEduInfo.map(async (item) => {
          const { id, ...values } = item;

          const updatedExistingInfo = await this.educationInfoService.update(
            id,
            values,
          );

          if (!updatedExistingInfo)
            throw new UnprocessableEntityException(
              'Não foi possível atualizar o usuário (dados educacionais incorretos)',
            );
        }),
      );

      if (!updatedExistingEduList)
        throw new UnprocessableEntityException(
          'Não foi possível atualizar o usuário (dados educacionais incorretos)',
        );
    }

    const existingPhones = phoneNumbers.filter((info) => info.id);
    const newPhone = phoneNumbers.filter((info) => !info.id);

    if (existingPhones.length <= 0 && newPhone.length <= 0)
      throw new UnprocessableEntityException(
        'Não foi possível atualizar o usuário (dados para contato incorretos)',
      );

    if (existingPhones.length <= 0)
      await this.phoneNumbersService.removeAllFromUser(id);

    if (newPhone.length > 0) {
      const updatedNewPhoneList = await Promise.all(
        newPhone.map(async (item) => {
          const newPhone = await this.phoneNumbersService.createNewInstance(
            item,
            id,
          );

          const newInfo = await this.phoneNumbersService.create(newPhone, id);

          if (!newInfo)
            throw new UnprocessableEntityException(
              'Não foi possível atualizar o usuário (dados para contato incorretos)',
            );
        }),
      );

      if (!updatedNewPhoneList)
        throw new UnprocessableEntityException(
          'Não foi possível atualizar o usuário (dados para contato incorretos)',
        );
    }

    if (existingPhones.length > 0) {
      const updatedExistingPhonesList = await Promise.all(
        existingPhones.map(async (item) => {
          const { id, ...values } = item;

          const updatedExistingInfo = await this.phoneNumbersService.update(
            id,
            values,
          );

          if (!updatedExistingInfo)
            throw new UnprocessableEntityException(
              'Não foi possível atualizar o usuário (dados para contato incorretos)',
            );
        }),
      );

      if (!updatedExistingPhonesList)
        throw new UnprocessableEntityException(
          'Não foi possível atualizar o usuário (dados para contato incorretos)',
        );
    }

    const remainingInfo = await Promise.all([
      await this.addressesService.update(address.id, address),
    ]);

    if (!remainingInfo)
      throw new UnprocessableEntityException(
        'Não foi possível atualizar o usuário (dados pessoais preenchidos incorretamente)',
      );

    const updatedUserInfo = await this.editUser(user, id);

    if (!updatedUserInfo)
      throw new UnprocessableEntityException(
        'Não foi possível atualizar o usuário (dados pessoais preenchidos incorretamente)',
      );

    return updatedUserInfo;
  }

  async updateTeacher(id: number, body: UpdateTeacherDto) {
    const { address, educationInfoList, phoneNumbers, user } = body;

    const existingEduInfo = educationInfoList.filter((info) => info.id);
    const newEduInfo = educationInfoList.filter((info) => !info.id);

    if (existingEduInfo.length <= 0 && newEduInfo.length <= 0)
      throw new UnprocessableEntityException(
        'Não foi possível atualizar o usuário (dados educacionais incorretos)',
      );

    if (existingEduInfo.length <= 0)
      await this.educationInfoService.removeAllFromUser(id);

    if (newEduInfo.length > 0) {
      const newEduInfoList = await Promise.all(
        newEduInfo.map(async (item) => {
          const newInfo = await this.educationInfoService.createForManage(
            item,
            id,
          );

          if (!newInfo)
            throw new UnprocessableEntityException(
              'Não foi possível atualizar o usuário (dados educacionais incorretos)',
            );
        }),
      );

      if (!newEduInfoList)
        throw new UnprocessableEntityException(
          'Não foi possível atualizar o usuário (dados educacionais incorretos)',
        );
    }

    if (existingEduInfo.length > 0) {
      const updatedExistingEduList = await Promise.all(
        existingEduInfo.map(async (item) => {
          const { id, ...values } = item;

          const updatedExistingInfo = await this.educationInfoService.update(
            id,
            values,
          );

          if (!updatedExistingInfo)
            throw new UnprocessableEntityException(
              'Não foi possível atualizar o usuário (dados educacionais incorretos)',
            );
        }),
      );

      if (!updatedExistingEduList)
        throw new UnprocessableEntityException(
          'Não foi possível atualizar o usuário (dados educacionais incorretos)',
        );
    }

    const existingPhones = phoneNumbers.filter((info) => info.id);
    const newPhone = phoneNumbers.filter((info) => !info.id);

    if (existingPhones.length <= 0 && newPhone.length <= 0)
      throw new UnprocessableEntityException(
        'Não foi possível atualizar o usuário (dados para contato incorretos)',
      );

    if (existingPhones.length <= 0)
      await this.phoneNumbersService.removeAllFromUser(id);

    if (newPhone.length > 0) {
      const updatedNewPhoneList = await Promise.all(
        newPhone.map(async (item) => {
          const newPhone = await this.phoneNumbersService.createNewInstance(
            item,
            id,
          );

          const newInfo = await this.phoneNumbersService.create(newPhone, id);

          if (!newInfo)
            throw new UnprocessableEntityException(
              'Não foi possível atualizar o usuário (dados para contato incorretos)',
            );
        }),
      );

      if (!updatedNewPhoneList)
        throw new UnprocessableEntityException(
          'Não foi possível atualizar o usuário (dados para contato incorretos)',
        );
    }

    if (existingPhones.length > 0) {
      const updatedExistingPhonesList = await Promise.all(
        existingPhones.map(async (item) => {
          const { id, ...values } = item;

          const updatedExistingInfo = await this.phoneNumbersService.update(
            id,
            values,
          );

          if (!updatedExistingInfo)
            throw new UnprocessableEntityException(
              'Não foi possível atualizar o usuário (dados para contato incorretos)',
            );
        }),
      );

      if (!updatedExistingPhonesList)
        throw new UnprocessableEntityException(
          'Não foi possível atualizar o usuário (dados para contato incorretos)',
        );
    }

    const remainingInfo = await Promise.all([
      await this.addressesService.update(address.id, address),
    ]);

    if (!remainingInfo)
      throw new UnprocessableEntityException(
        'Não foi possível atualizar o usuário (dados pessoais preenchidos incorretamente)',
      );

    const updatedUserInfo = await this.editUser(user, id);

    if (!updatedUserInfo)
      throw new UnprocessableEntityException(
        'Não foi possível atualizar o usuário (dados pessoais preenchidos incorretamente)',
      );

    return updatedUserInfo;
  }

  async updateAdmin(id: number, body: UpdateAdminDto) {
    const { address, phoneNumbers, user } = body;

    const existingPhones = phoneNumbers.filter((info) => info.id);
    const newPhone = phoneNumbers.filter((info) => !info.id);

    if (existingPhones.length <= 0 && newPhone.length <= 0)
      throw new UnprocessableEntityException(
        'Não foi possível atualizar o usuário (dados para contato incorretos)',
      );

    if (existingPhones.length <= 0)
      await this.phoneNumbersService.removeAllFromUser(id);

    if (newPhone.length > 0) {
      const updatedNewPhoneList = await Promise.all(
        newPhone.map(async (item) => {
          const newPhone = await this.phoneNumbersService.createNewInstance(
            item,
            id,
          );

          const newInfo = await this.phoneNumbersService.create(newPhone, id);

          if (!newInfo)
            throw new UnprocessableEntityException(
              'Não foi possível atualizar o usuário (dados para contato incorretos)',
            );
        }),
      );

      if (!updatedNewPhoneList)
        throw new UnprocessableEntityException(
          'Não foi possível atualizar o usuário (dados para contato incorretos)',
        );
    }

    if (existingPhones.length > 0) {
      const updatedExistingPhonesList = await Promise.all(
        existingPhones.map(async (item) => {
          const { id, ...values } = item;

          const updatedExistingInfo = await this.phoneNumbersService.update(
            id,
            values,
          );

          if (!updatedExistingInfo)
            throw new UnprocessableEntityException(
              'Não foi possível atualizar o usuário (dados para contato incorretos)',
            );
        }),
      );

      if (!updatedExistingPhonesList)
        throw new UnprocessableEntityException(
          'Não foi possível atualizar o usuário (dados para contato incorretos)',
        );
    }

    const remainingInfo = await Promise.all([
      await this.addressesService.update(address.id, address),
    ]);

    if (!remainingInfo)
      throw new UnprocessableEntityException(
        'Não foi possível atualizar o usuário (dados pessoais preenchidos incorretamente)',
      );

    const updatedUserInfo = await this.editUser(user, id);

    if (!updatedUserInfo)
      throw new UnprocessableEntityException(
        'Não foi possível atualizar o usuário (dados pessoais preenchidos incorretamente)',
      );

    return updatedUserInfo;
  }

  async delete(id: number) {
    const user = await this.findById(id);

    if (!user) throw new NotFoundException('Usuário não encontrado');

    user.updatedAt = new Date();
    user.active = false;

    return this.usersRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.findById(id);

    if (!user) throw new NotFoundException('Usuário não encontrado');

    return this.usersRepository.remove(user);
  }

  async editUser(body: UpdateFullUserDto, id: number) {
    const user = await this.findById(id);

    const attrs: Partial<User> = body;

    console.log('attrs.email ========');
    console.log(attrs.email);

    user.updatedAt = new Date();
    Object.assign(user, attrs);

    return await this.usersRepository.save(user);
  }
}
