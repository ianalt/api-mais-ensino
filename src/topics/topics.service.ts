import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { CreateTopicDTO } from './dtos/create-topic.dto';
import { UpdateTopicDTO } from './dtos/update-topic.dto';
import { Topic } from './topic.entity';

@Injectable()
export class TopicsService {
  constructor(
    @InjectRepository(Topic) private topicsRepository: Repository<Topic>,
  ) {}

  private allRelations = ['category', 'topicFiles', 'comments'];

  findById(id: number) {
    if (!id) return null;

    return this.topicsRepository.findOne({
      where: { id },
      relations: this.allRelations,
    });
  }

  findActiveById(id: number) {
    if (!id) return null;

    return this.topicsRepository.findOne({
      where: { id, active: true },
      relations: this.allRelations,
    });
  }

  findAll() {
    return this.topicsRepository.find();
  }

  findAllActive() {
    return this.topicsRepository.find({
      where: { active: true },
      relations: this.allRelations,
    });
  }

  create(body: CreateTopicDTO) {
    const newTopic = this.topicsRepository.create({
      createdAt: new Date(),
      ...body,
    });

    return this.topicsRepository.save(newTopic);
  }

  async update(id: number, body: UpdateTopicDTO) {
    const topic = await this.findActiveById(id);

    if (!topic) throw new NotFoundException('Topic not found.');

    const attrs: Partial<Topic> = body;

    topic.updatedAt = new Date();

    Object.assign(topic, attrs);

    return this.topicsRepository.save(topic);
  }

  async setActive(id: number, active: boolean) {
    const topic = await this.findById(id);

    if (!topic) throw new NotFoundException('Topic not found.');

    topic.updatedAt = new Date();
    topic.active = active;

    return this.topicsRepository.save(topic);
  }

  async remove(id: number) {
    const topic = await this.findActiveById(id);

    if (!topic) throw new NotFoundException('Topic not found.');

    return this.topicsRepository.remove(topic);
  }
}
