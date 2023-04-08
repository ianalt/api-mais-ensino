import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/categories/category.entity';
import { Repository } from 'typeorm';
import { CreateTopicDto } from './dtos/create-topic.dto';
import { UpdateTopicDto } from './dtos/update-topic.dto';
import { Topic } from './topic.entity';

@Injectable()
export class TopicsService {
  constructor(
    @InjectRepository(Topic) private topicsRepository: Repository<Topic>,

    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  private allRelations = [
    'category',
    'category.subject',
    'topicFiles',
    'comments',
  ];

  findById(id: number) {
    if (!id) return null;

    return this.topicsRepository.findOne({
      where: { id, active: true },
      relations: this.allRelations,
    });
  }

  async findAll() {
    const topics = await this.topicsRepository.find({
      relations: this.allRelations,
    });

    if (!topics) return null;

    return topics;
  }

  async create(body: CreateTopicDto) {
    const { categoryId, ...attrs } = body;

    const category = await this.categoriesRepository.findOne({
      where: {
        active: true,
        id: categoryId,
      },
    });

    if (!category) throw new NotFoundException('Category not found.');

    const newTopic = this.topicsRepository.create({
      ...attrs,
    });

    newTopic.category = category;

    return this.topicsRepository.save(newTopic);
  }

  async update(id: number, body: UpdateTopicDto) {
    const topic = await this.findById(id);

    if (!topic) throw new NotFoundException('Topic not found.');

    const { categoryId, ...values } = body;

    const category = await this.categoriesRepository.findOne({
      where: {
        active: true,
        id: categoryId,
      },
    });

    if (!category) throw new NotFoundException('Category not found.');

    const attrs: Partial<Topic> = values;

    topic.updatedAt = new Date();
    topic.category = category;

    Object.assign(topic, attrs);

    return this.topicsRepository.save(topic);
  }

  async delete(id: number) {
    const topic = await this.findById(id);

    if (!topic) throw new NotFoundException('Topic not found.');

    topic.updatedAt = new Date();
    topic.active = false;

    return this.topicsRepository.save(topic);
  }

  async remove(id: number) {
    const topic = await this.findById(id);

    if (!topic) throw new NotFoundException('Topic not found.');

    return this.topicsRepository.remove(topic);
  }
}
