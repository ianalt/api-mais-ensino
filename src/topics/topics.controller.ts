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
  @Get('/:id')
  async findById(@Param('id') id: string) {
    const topic = await this.topicsService.findById(parseInt(id));

    if (!topic) throw new NotFoundException('Topic not found.');

    return topic;
  }

  @Roles('estudante', 'monitor', 'professor', 'admin')
  @Get()
  findAll() {
    return this.topicsService.findAll();
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
    return await this.topicsService.delete(parseInt(id));
  }

  @Roles('estudante', 'monitor', 'professor', 'admin')
  @Delete('/:id')
  async remove(@Param('id') id: string) {
    return await this.topicsService.remove(parseInt(id));
  }
}
