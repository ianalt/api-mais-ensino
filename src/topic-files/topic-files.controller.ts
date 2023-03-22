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
import { CreateTopicFileDto } from './dtos/create-topic-file.dto';
import { UpdateTopicFileDto } from './dtos/update-topic-file.dto';
import { TopicFilesService } from './topic-files.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('topic-files')
export class TopicFilesController {
  constructor(private topicFilesService: TopicFilesService) {}

  @Roles('admin')
  @Get('/:id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    const topic = await this.topicFilesService.findById(id);

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
  async create(@Body() body: CreateTopicFileDto) {
    return this.topicFilesService.create(body);
  }

  @Roles('admin')
  @Patch('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateTopicFileDto,
  ) {
    return await this.topicFilesService.update(id, body);
  }

  @Roles('admin')
  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.topicFilesService.delete(id);
  }

  @Roles('admin')
  @Delete('/:id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.topicFilesService.remove(id);
  }
}
