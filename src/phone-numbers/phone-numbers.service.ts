import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { CreatePhoneNumberDto } from './dtos/create-phone-number.dto';
import { UpdatePhoneNumberDto } from './dtos/update-phone-number.dto';
import { PhoneNumber } from './phone-number.entity';

@Injectable()
export class PhoneNumbersService {
  constructor(
    @InjectRepository(PhoneNumber)
    private phoneNumbersRepository: Repository<PhoneNumber>,

    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  private allRelations = ['user'];

  findById(id: number) {
    if (!id) return null;

    return this.phoneNumbersRepository.findOne({
      where: { id, active: true },
      relations: this.allRelations,
    });
  }

  async findByUserId(userId: number) {
    if (!userId || userId <= 0)
      throw new UnprocessableEntityException('ID de usuário inválido');

    return await this.phoneNumbersRepository.find({
      where: { active: true, user: { id: userId } },
      relations: this.allRelations,
    });
  }

  findAll() {
    return this.phoneNumbersRepository.find({
      where: { active: true },
      // relations: this.allRelations,
      relations: this.allRelations,
    });
  }

  async createNewInstance(data: Partial<PhoneNumber>, userId: number) {
    const user = await this.usersRepository.findOne({ where: { id: userId } });

    if (!user) throw new NotFoundException('Usuário não encontrado');

    const newPhoneNumber = this.phoneNumbersRepository.create({
      ...data,
    });

    newPhoneNumber.user = user;

    return newPhoneNumber;
  }

  async create(body: CreatePhoneNumberDto, userId: number) {
    const user = await this.usersRepository.findOne(userId);

    if (!user) throw new NotFoundException('User not found.');

    const newPhoneNumber = this.phoneNumbersRepository.create({
      ...body,
    });

    newPhoneNumber.user = user;

    return this.phoneNumbersRepository.save(newPhoneNumber);
  }

  async createForManage(body: CreatePhoneNumberDto, userId: number) {
    const user = await this.usersRepository.findOne(userId);

    if (!user) throw new NotFoundException('Usuário não encontrado');

    const newPhoneNumber = this.phoneNumbersRepository.create({
      ...body,
    });

    newPhoneNumber.user = user;

    return this.phoneNumbersRepository.save(newPhoneNumber);
  }

  async update(id: number, body: UpdatePhoneNumberDto) {
    const phoneNumber = await this.findById(id);

    if (!phoneNumber) throw new NotFoundException('Phone number not found.');

    const attrs: Partial<PhoneNumber> = body;

    phoneNumber.updatedAt = new Date();

    Object.assign(phoneNumber, attrs);

    return this.phoneNumbersRepository.save(phoneNumber);
  }

  async delete(id: number) {
    const phoneNumber = await this.findById(id);

    if (!phoneNumber) throw new NotFoundException('Phone number not found.');

    phoneNumber.updatedAt = new Date();
    phoneNumber.active = false;

    return this.phoneNumbersRepository.save(phoneNumber);
  }

  async remove(id: number) {
    const phoneNumber = await this.findById(id);

    if (!phoneNumber) throw new NotFoundException('Phone number not found.');

    return this.phoneNumbersRepository.remove(phoneNumber);
  }

  async removeAllFromUser(userId: number) {
    const phoneNumbersList = await this.phoneNumbersRepository.find({
      where: { user: { id: userId } },
    });

    if (phoneNumbersList.length > 0) {
      const infoDeleted = Promise.all(
        phoneNumbersList.map(async (info) => await this.remove(info.id)),
      );

      if (!infoDeleted)
        throw new InternalServerErrorException(
          'Erro ao remover informações educacionais do usuário',
        );
    }
  }
}
