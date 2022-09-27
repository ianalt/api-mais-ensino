import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTopicFileDTO } from './dtos/create-topic-file.dto';
import { UpdateTopicFileDTO } from './dtos/update-topic-file.dto';
import { TopicFile } from './topic-file.entity';

@Injectable()
export class TopicFilesService {
  constructor(
    @InjectRepository(TopicFile)
    private topicFilesRepository: Repository<TopicFile>,
  ) {}

  private allRelations = ['topic'];

  findById(id: number) {
    if (!id) return null;

    return this.topicFilesRepository.findOne({
      where: { id, active: true },
      relations: this.allRelations,
    });
  }

  findAll() {
    return this.topicFilesRepository.find({
      where: { active: true },
      relations: this.allRelations,
    });
  }

  create(body: CreateTopicFileDTO) {
    const newTopicFile = this.topicFilesRepository.create({
      ...body,
    });

    return this.topicFilesRepository.save(newTopicFile);
  }

  async update(id: number, body: UpdateTopicFileDTO) {
    const topicFile = await this.findById(id);

    if (!topicFile) throw new NotFoundException('Topic file not found.');

    const attrs: Partial<TopicFile> = body;

    topicFile.updatedAt = new Date();

    Object.assign(topicFile, attrs);

    return this.topicFilesRepository.save(topicFile);
  }

  async delete(id: number) {
    const topicFile = await this.findById(id);

    if (!topicFile) throw new NotFoundException('Topic file not found.');

    topicFile.updatedAt = new Date();
    topicFile.active = false;

    return this.topicFilesRepository.save(topicFile);
  }

  async remove(id: number) {
    const topicFile = await this.findById(id);

    if (!topicFile) throw new NotFoundException('Topic file not found.');

    return this.topicFilesRepository.remove(topicFile);
  }
}
