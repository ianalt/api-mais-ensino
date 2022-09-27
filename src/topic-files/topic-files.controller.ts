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
import { CreateTopicFileDTO } from './dtos/create-topic-file.dto';
import { UpdateTopicFileDTO } from './dtos/update-topic-file.dto';
import { TopicFilesService } from './topic-files.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('topic-files')
export class TopicFilesController {
  constructor(private topicFilesService: TopicFilesService) {}

  @Roles('admin')
  @Get('/:id')
  async findById(@Param('id') id: string) {
    const topic = await this.topicFilesService.findById(parseInt(id));

    if (!topic) throw new NotFoundException('Topic file not found.');

    return topic;
  }

  @Roles('admin')
  @Get()
  findAll() {
    return this.topicFilesService.findAll();
  }

  @Roles('admin')
  @Post()
  async create(@Body() body: CreateTopicFileDTO) {
    return this.topicFilesService.create(body);
  }

  @Roles('admin')
  @Patch('/:id')
  async update(@Param('id') id: string, @Body() body: UpdateTopicFileDTO) {
    return await this.topicFilesService.update(parseInt(id), body);
  }

  @Roles('admin')
  @Patch('delete/:id')
  async delete(@Param('id') id: string) {
    return await this.topicFilesService.delete(parseInt(id));
  }

  @Roles('admin')
  @Delete('/:id')
  async remove(@Param('id') id: string) {
    return await this.topicFilesService.remove(parseInt(id));
  }
}
