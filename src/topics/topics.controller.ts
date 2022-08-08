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
import { CreateTopicDTO } from './dtos/create-topic.dto';
import { UpdateTopicDTO } from './dtos/update-topic.dto';
import { TopicsService } from './topics.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('topics')
export class TopicsController {
  constructor(private topicsService: TopicsService) {}

  @Roles('estudante', 'monitor', 'professor', 'admin')
  @Get('/history/:id')
  async findById(@Param('id') id: string) {
    const topic = await this.topicsService.findById(parseInt(id));

    if (!topic) throw new NotFoundException('Topic not found.');

    return topic;
  }

  @Roles('estudante', 'monitor', 'professor', 'admin')
  @Get('/:id')
  async findActiveById(@Param('id') id: string) {
    const topic = await this.topicsService.findActiveById(parseInt(id));

    if (!topic) throw new NotFoundException('Topic not found.');

    return topic;
  }

  @Roles('estudante', 'monitor', 'professor', 'admin')
  @Get('/history')
  findAll() {
    return this.topicsService.findAll();
  }

  @Roles('estudante', 'monitor', 'professor', 'admin')
  @Get()
  findAllActive() {
    return this.topicsService.findAllActive();
  }

  @Roles('estudante', 'monitor', 'professor', 'admin')
  @Post()
  create(@Body() body: CreateTopicDTO) {
    return this.topicsService.create(body);
  }

  @Roles('estudante', 'monitor', 'professor', 'admin')
  @Patch('/:id')
  async update(@Param('id') id: string, @Body() body: UpdateTopicDTO) {
    return await this.topicsService.update(parseInt(id), body);
  }

  @Roles('estudante', 'monitor', 'professor', 'admin')
  @Patch('delete/:id')
  async delete(@Param('id') id: string) {
    return await this.topicsService.setActive(parseInt(id), false);
  }

  @Roles('estudante', 'monitor', 'professor', 'admin')
  @Delete('/:id')
  async remove(@Param('id') id: string) {
    return await this.topicsService.remove(parseInt(id));
  }
}
