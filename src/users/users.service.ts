import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dtos/create-user.dto';
import { User } from './user.entity';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { hashPassword } from 'src/auth/hashing';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
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

  async findById(id: number) {
    if (!id) return null;

    const user = await this.usersRepository.findOne({
      where: { id },
      relations: this.allRelations,
    });

    if (!user) throw new NotFoundException('User not found.');

    return user;
  }

  async findActiveById(id: number) {
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

  async findAllActive() {
    const users = await this.usersRepository.find({
      where: { active: true },
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

  async findByEmail(email: string) {
    if (!email) return null;

    return await this.usersRepository.findOne({
      where: { email },
      relations: this.allRelations,
    });
  }

  async findActiveByEmail(email: string) {
    if (!email) return null;

    return await this.usersRepository.findOne({
      where: { email, active: true },
      relations: this.allRelations,
    });
  }

  async create(body: CreateUserDTO) {
    const { password, ...attrs } = body;

    const hashedPassword = await hashPassword(password);

    if (!hashedPassword)
      throw new BadRequestException('An error has occurred. Please try again.');

    const newUser = this.usersRepository.create({
      createdAt: new Date(),
      ...attrs,
      password: hashedPassword,
    });

    return this.usersRepository.save(newUser);
  }

  async update(id: number, body: UpdateUserDTO) {
    const user = await this.findActiveById(id);

    if (!user) throw new NotFoundException('User not found.');

    const { password, ...others } = body;

    const attrs: Partial<User> = others;

    const hashedPassword = await hashPassword(password);

    if (!hashedPassword)
      throw new BadRequestException('An error has occurred. Please try again.');

    user.updatedAt = new Date();
    user.password = hashedPassword;

    Object.assign(user, attrs);

    return this.usersRepository.save(user);
  }

  async setActive(id: number, active: boolean) {
    const user = await this.findById(id);

    if (!user) throw new NotFoundException('User not found.');

    user.updatedAt = new Date();
    user.active = active;

    return this.usersRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.findActiveById(id);

    if (!user) throw new NotFoundException('User not found.');

    return this.usersRepository.remove(user);
  }
}
