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

  findByID(id: number) {
    if (!id) return null;

    return this.topicsRepository.findOne({
      where: { id, active: true },
      relations: this.allRelations,
    });
  }

  findAll() {
    return this.topicsRepository.find({
      where: { active: true },
      relations: this.allRelations,
    });
  }

  create(body: CreateTopicDTO) {
    const newTopic = this.topicsRepository.create({
      ...body,
    });

    return this.topicsRepository.save(newTopic);
  }

  async update(id: number, body: UpdateTopicDTO) {
    const topic = await this.findByID(id);

    if (!topic) throw new NotFoundException('Topic not found.');

    const attrs: Partial<Topic> = body;

    topic.updatedAt = new Date();

    Object.assign(topic, attrs);

    return this.topicsRepository.save(topic);
  }

  async delete(id: number) {
    const topic = await this.findByID(id);

    if (!topic) throw new NotFoundException('Topic not found.');

    topic.updatedAt = new Date();
    topic.active = false;

    return this.topicsRepository.save(topic);
  }

  async remove(id: number) {
    const topic = await this.findByID(id);

    if (!topic) throw new NotFoundException('Topic not found.');

    return this.topicsRepository.remove(topic);
  }
}
