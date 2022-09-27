import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { CreateEducationInfoDTO } from './dtos/create-education-info.dto';
import { UpdateEducationInfoDTO } from './dtos/update-education-info.dto';
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

  findAll() {
    return this.educationInfoRepository.find({
      where: { active: true },
      relations: this.allRelations,
    });
  }

  async create(body: CreateEducationInfoDTO, userId: number) {
    const user = await this.usersRepository.findOne(userId);

    if (!user) throw new NotFoundException('User not found.');

    const newEducationInfo = this.educationInfoRepository.create({
      createdAt: new Date(),
      ...body,
    });

    newEducationInfo.user = user;

    return this.educationInfoRepository.save(newEducationInfo);
  }

  async update(id: number, body: UpdateEducationInfoDTO) {
    const educationInfo = await this.findById(id);

    if (!educationInfo)
      throw new NotFoundException('Education info not found.');

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
