import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateKnowledgeAreaDto } from './dtos/create-knowledge-area.dto';
import { UpdateKnowledgeAreaDto } from './dtos/update-knowledge-area.dto';
import { KnowledgeArea } from './knowledge-area.entity';

@Injectable()
export class KnowledgeAreasService {
  constructor(
    @InjectRepository(KnowledgeArea)
    private knowledgeAreasRepository: Repository<KnowledgeArea>,
  ) {}

  private allRelations = ['subjects'];

  findById(id: number) {
    if (!id) return null;

    return this.knowledgeAreasRepository.findOne({
      where: { id, active: true },
      relations: this.allRelations,
    });
  }

  async findAll() {
    const knowledgeAreas = await this.knowledgeAreasRepository.find({
      relations: this.allRelations,
    });

    if (!knowledgeAreas || knowledgeAreas.length <= 0) return [];

    return knowledgeAreas;
  }

  create(body: CreateKnowledgeAreaDto) {
    const newKnowledgeArea = this.knowledgeAreasRepository.create({
      ...body,
    });

    return this.knowledgeAreasRepository.save(newKnowledgeArea);
  }

  async update(id: number, body: UpdateKnowledgeAreaDto) {
    const knowledgeArea = await this.findById(id);

    if (!knowledgeArea)
      throw new NotFoundException('Knowledge area not found.');

    const attrs: Partial<KnowledgeArea> = body;

    knowledgeArea.updatedAt = new Date();

    Object.assign(knowledgeArea, attrs);

    return this.knowledgeAreasRepository.save(knowledgeArea);
  }

  async delete(id: number) {
    const knowledgeArea = await this.findById(id);

    if (!knowledgeArea)
      throw new NotFoundException('Knowledge area not found.');

    knowledgeArea.updatedAt = new Date();
    knowledgeArea.active = false;

    return this.knowledgeAreasRepository.save(knowledgeArea);
  }

  async remove(id: number) {
    const knowledgeArea = await this.findById(id);

    if (!knowledgeArea)
      throw new NotFoundException('Knowledge area not found.');

    return this.knowledgeAreasRepository.remove(knowledgeArea);
  }
}
