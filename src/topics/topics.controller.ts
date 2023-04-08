import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CreateTopicDto } from './dtos/create-topic.dto';
import { TopicDto } from './dtos/topic.dto';
import { UpdateTopicDto } from './dtos/update-topic.dto';
import { TopicsService } from './topics.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('topics')
export class TopicsController {
  constructor(private topicsService: TopicsService) {}

  @Roles('estudante', 'monitor', 'professor', 'admin')
  @Get('/:id')
  @Serialize(TopicDto)
  async findById(@Param('id', ParseIntPipe) id: number) {
    const topic = await this.topicsService.findById(id);

    if (!topic) throw new NotFoundException('Topic not found.');

    return topic;
  }

  @Roles('estudante', 'monitor', 'professor', 'admin')
  @Get()
  @Serialize(TopicDto)
  async findAll() {
    const topics = await this.topicsService.findAll();

    if (!topics)
      throw new NotFoundException('Não foi possível encontrar tópicos');

    return topics;
  }

  @Roles('professor', 'admin')
  @Post()
  @Serialize(TopicDto)
  async create(@Body() body: CreateTopicDto) {
    return await this.topicsService.create(body);
  }

  @Roles('professor', 'admin')
  @Patch('/:id')
  @Serialize(TopicDto)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateTopicDto,
  ) {
    return await this.topicsService.update(id, body);
  }

  @Roles('professor', 'admin')
  @Delete('delete/:id')
  @Serialize(TopicDto)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.topicsService.delete(id);
  }

  @Roles('professor', 'admin')
  @Delete('/:id')
  @Serialize(TopicDto)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.topicsService.remove(id);
  }
}
