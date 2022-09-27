import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateKnowledgeAreaDTO } from './dtos/create-knowledge-area.dto';
import { UpdateKnowledgeAreaDTO } from './dtos/update-knowledge-area.dto';
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

  findAll() {
    return this.knowledgeAreasRepository.find({
      where: { active: true },
      relations: this.allRelations,
    });
  }

  create(body: CreateKnowledgeAreaDTO) {
    const newKnowledgeArea = this.knowledgeAreasRepository.create({
      createdAt: new Date(),
      ...body,
    });

    return this.knowledgeAreasRepository.save(newKnowledgeArea);
  }

  async update(id: number, body: UpdateKnowledgeAreaDTO) {
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
