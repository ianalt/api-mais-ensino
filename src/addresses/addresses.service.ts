import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { Address } from './address.entity';
import { CreateAddressDTO } from './dtos/create-address.dto';
import { UpdateAddressDTO } from './dtos/update-address.dto';

@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(Address)
    private addressesRepository: Repository<Address>,

    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  private allRelations = ['user'];

  findById(id: number) {
    if (!id) return null;

    return this.addressesRepository.findOne({
      where: { id, active: true },
      relations: this.allRelations,
    });
  }

  findAll() {
    return this.addressesRepository.find({
      where: { active: true },
      relations: this.allRelations,
    });
  }

  async create(body: CreateAddressDTO, userId: number) {
    const user = await this.usersRepository.findOne(userId);

    if (!user) throw new NotFoundException('User not found.');

    const newAddress = this.addressesRepository.create({
      createdAt: new Date(),
      ...body,
    });

    newAddress.user = user;

    return this.addressesRepository.save(newAddress);
  }

  async update(id: number, body: UpdateAddressDTO) {
    const address = await this.findById(id);

    if (!address) throw new NotFoundException('Address not found.');

    const attrs: Partial<Address> = body;

    address.updatedAt = new Date();

    Object.assign(address, attrs);

    return this.addressesRepository.save(address);
  }

  async delete(id: number) {
    const address = await this.findById(id);

    if (!address) throw new NotFoundException('Address not found.');

    address.updatedAt = new Date();
    address.active = false;

    return this.addressesRepository.save(address);
  }

  async remove(id: number) {
    const address = await this.findById(id);

    if (!address) throw new NotFoundException('Address not found.');

    return this.addressesRepository.remove(address);
  }
}
