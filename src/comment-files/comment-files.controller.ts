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
import { CommentFilesService } from './comment-files.service';
import { CreateCommentFileDTO } from './dtos/create-comment-file.dto';
import { UpdateCommentFileDTO } from './dtos/update-comment-file.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('comment-files')
export class CommentFilesController {
  constructor(private commentFilesService: CommentFilesService) {}

  @Roles('admin')
  @Get('/history/:id')
  async findById(@Param('id') id: string) {
    const commentFile = await this.commentFilesService.findById(parseInt(id));

    if (!commentFile) throw new NotFoundException('Comment file not found.');

    return commentFile;
  }

  @Roles('admin')
  @Get('/:id')
  async findActiveById(@Param('id') id: string) {
    const commentFile = await this.commentFilesService.findActiveById(
      parseInt(id),
    );

    if (!commentFile) throw new NotFoundException('Comment file not found.');

    return commentFile;
  }

  @Roles('admin')
  @Get('/history')
  findAll() {
    return this.commentFilesService.findAll();
  }

  @Roles('admin')
  @Get()
  findAllActive() {
    return this.commentFilesService.findAllActive();
  }

  @Roles('admin')
  @Post()
  create(@Body() body: CreateCommentFileDTO) {
    return this.commentFilesService.create(body);
  }

  @Roles('admin')
  @Patch('/:id')
  async update(@Param('id') id: string, @Body() body: UpdateCommentFileDTO) {
    return await this.commentFilesService.update(parseInt(id), body);
  }

  @Roles('admin')
  @Patch('delete/:id')
  async delete(@Param('id') id: string) {
    return await this.commentFilesService.setActive(parseInt(id), false);
  }

  @Roles('admin')
  @Delete('/:id')
  async remove(@Param('id') id: string) {
    return await this.commentFilesService.remove(parseInt(id));
  }
}
