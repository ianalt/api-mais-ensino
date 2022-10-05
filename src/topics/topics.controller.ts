import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CreateTopicDTO } from './dtos/create-topic.dto';
import { TopicDTO } from './dtos/topic.dto';
import { UpdateTopicDTO } from './dtos/update-topic.dto';
import { TopicsService } from './topics.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('topics')
export class TopicsController {
  constructor(private topicsService: TopicsService) {}

  @Roles('estudante', 'monitor', 'professor', 'admin')
  @Get('/:id')
  @Serialize(TopicDTO)
  async findByID(@Param('id') id: string) {
    const topic = await this.topicsService.findByID(parseInt(id));

    if (!topic) throw new NotFoundException('Topic not found.');

    return topic;
  }

  @Roles('estudante', 'monitor', 'professor', 'admin')
  @Get()
  @Serialize(TopicDTO)
  async findAll() {
    const topics = await this.topicsService.findAll();

    if (!topics) throw new NotFoundException('Could not find topics.');

    return topics;
  }

  @Roles('professor', 'admin')
  @Post()
  @Serialize(TopicDTO)
  async create(@Body() body: CreateTopicDTO) {
    return await this.topicsService.create(body);
  }

  @Roles('professor', 'admin')
  @Patch('/:id')
  @Serialize(TopicDTO)
  async update(@Param('id') id: string, @Body() body: UpdateTopicDTO) {
    return await this.topicsService.update(parseInt(id), body);
  }

  @Roles('professor', 'admin')
  @Delete('delete/:id')
  @Serialize(TopicDTO)
  async delete(@Param('id') id: string) {
    return await this.topicsService.delete(parseInt(id));
  }

  @Roles('professor', 'admin')
  @Delete('/:id')
  @Serialize(TopicDTO)
  async remove(@Param('id') id: string) {
    return await this.topicsService.remove(parseInt(id));
  }
}
