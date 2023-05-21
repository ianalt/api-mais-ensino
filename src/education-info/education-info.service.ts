import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { CreateEducationInfoDto } from './dtos/create-education-info.dto';
import { UpdateEducationInfoDto } from './dtos/update-education-info.dto';
import { EducationInfo } from './education-info.entity';

@Injectable()
export class EducationInfoService {
  constructor(
    @InjectRepository(EducationInfo)
    private educationInfoRepository: Repository<EducationInfo>,

    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  private allRelations = ['user'];

  findById(id: number) {
    if (!id) return null;

    return this.educationInfoRepository.findOne({
      where: { id, active: true },
      relations: this.allRelations,
    });
  }

  async findByUserId(userId: number) {
    if (!userId || userId <= 0)
      throw new UnprocessableEntityException('ID de usuário inválido');

    return await this.educationInfoRepository.find({
      where: { active: true, user: { id: userId } },
      relations: this.allRelations,
    });
  }

  findAll() {
    return this.educationInfoRepository.find({
      where: { active: true },
      relations: this.allRelations,
    });
  }

  async createNewInstance(values: Partial<EducationInfo>, userId: number) {
    const user = await this.usersRepository.findOne({ where: { id: userId } });

    if (!user) throw new NotFoundException('Usuário não encontrado');

    const newEducationInfo = this.educationInfoRepository.create({
      ...values,
    });

    newEducationInfo.user = user;

    return newEducationInfo;
  }

  async create(body: CreateEducationInfoDto, userId: number) {
    const user = await this.usersRepository.findOne(userId);

    if (!user) throw new NotFoundException('User not found.');

    const newEducationInfo = this.educationInfoRepository.create({
      ...body,
    });

    newEducationInfo.user = user;

    return this.educationInfoRepository.save(newEducationInfo);
  }

  async update(id: number, body: UpdateEducationInfoDto) {
    const educationInfo = await this.findById(id);

    if (!educationInfo)
      throw new UnprocessableEntityException(
        'Não foi possível atualizar o usuário',
      );

    const attrs: Partial<EducationInfo> = body;

    educationInfo.updatedAt = new Date();

    Object.assign(educationInfo, attrs);

    return this.educationInfoRepository.save(educationInfo);
  }

  async delete(id: number) {
    const educationInfo = await this.findById(id);

    if (!educationInfo)
      throw new NotFoundException('Education info not found.');

    educationInfo.updatedAt = new Date();
    educationInfo.active = false;

    return this.educationInfoRepository.save(educationInfo);
  }

  async remove(id: number) {
    const educationInfo = await this.findById(id);

    if (!educationInfo)
      throw new NotFoundException('Education info not found.');

    return this.educationInfoRepository.remove(educationInfo);
  }
}
