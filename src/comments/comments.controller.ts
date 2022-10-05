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
import { CommentsService } from './comments.service';
import { CommentDTO } from './dtos/comment.dto';
import { CreateCommentDTO } from './dtos/create-comment.dto';
import { UpdateCommentDTO } from './dtos/update-comment.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Roles('monitor', 'professor', 'admin')
  @Get('/:id')
  @Serialize(CommentDTO)
  async findByID(@Param('id') id: string) {
    const comment = await this.commentsService.findByID(parseInt(id));

    if (!comment) throw new NotFoundException('Comment not found.');

    return comment;
  }

  @Roles('monitor', 'professor', 'admin')
  @Get()
  @Serialize(CommentDTO)
  async findAll() {
    const comments = await this.commentsService.findAll();

    if (!comments) throw new NotFoundException('Could not find comments.');

    return comments;
  }

  @Roles('estudante', 'monitor', 'professor', 'admin')
  @Post()
  @Serialize(CommentDTO)
  async create(@Body() body: CreateCommentDTO) {
    return await this.commentsService.create(body);
  }

  @Roles('estudante', 'monitor', 'professor', 'admin')
  @Patch('/:id')
  @Serialize(CommentDTO)
  async update(@Param('id') id: string, @Body() body: UpdateCommentDTO) {
    return await this.commentsService.update(parseInt(id), body);
  }

  @Roles('estudante', 'monitor', 'professor', 'admin')
  @Delete('delete/:id')
  @Serialize(CommentDTO)
  async delete(@Param('id') id: string) {
    return await this.commentsService.delete(parseInt(id));
  }

  @Roles('admin')
  @Delete('/:id')
  @Serialize(CommentDTO)
  async remove(@Param('id') id: string) {
    return await this.commentsService.remove(parseInt(id));
  }
}
