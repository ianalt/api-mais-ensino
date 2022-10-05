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
  @Get('/:id')
  async findByID(@Param('id') id: string) {
    const commentFile = await this.commentFilesService.findByID(parseInt(id));

    if (!commentFile) throw new NotFoundException('Comment file not found.');

    return commentFile;
  }

  @Roles('admin')
  @Get()
  findAll() {
    return this.commentFilesService.findAll();
  }

  @Roles('admin')
  @Post()
  async create(@Body() body: CreateCommentFileDTO) {
    return this.commentFilesService.create(body);
  }

  @Roles('admin')
  @Patch('/:id')
  async update(@Param('id') id: string, @Body() body: UpdateCommentFileDTO) {
    return await this.commentFilesService.update(parseInt(id), body);
  }

  @Roles('admin')
  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    return await this.commentFilesService.delete(parseInt(id));
  }

  @Roles('admin')
  @Delete('/:id')
  async remove(@Param('id') id: string) {
    return await this.commentFilesService.remove(parseInt(id));
  }
}
