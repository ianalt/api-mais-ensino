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
import { CreateCommentFileDto } from './dtos/create-comment-file.dto';
import { UpdateCommentFileDto } from './dtos/update-comment-file.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('comment-files')
export class CommentFilesController {
  constructor(private commentFilesService: CommentFilesService) {}

  @Roles('admin')
  @Get('/:id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    const commentFile = await this.commentFilesService.findById(id);

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
  async create(@Body() body: CreateCommentFileDto) {
    return this.commentFilesService.create(body);
  }

  @Roles('admin')
  @Patch('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateCommentFileDto,
  ) {
    return await this.commentFilesService.update(id, body);
  }

  @Roles('admin')
  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.commentFilesService.delete(id);
  }

  @Roles('admin')
  @Delete('/:id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.commentFilesService.remove(id);
  }
}
