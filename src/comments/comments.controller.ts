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
import { CommentDto } from './dtos/comment.dto';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { UpdateCommentDto } from './dtos/update-comment.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Roles('monitor', 'professor', 'admin')
  @Get('/:id')
  @Serialize(CommentDto)
  async findById(@Param('id', ParseIntPipe) id: number) {
    const comment = await this.commentsService.findById(id);

    if (!comment) throw new NotFoundException('Comment not found.');

    return comment;
  }

  @Roles('monitor', 'professor', 'admin')
  @Get()
  @Serialize(CommentDto)
  async findAll() {
    const comments = await this.commentsService.findAll();

    if (!comments) throw new NotFoundException('Could not find comments.');

    return comments;
  }

  @Roles('estudante', 'monitor', 'professor', 'admin')
  @Post()
  @Serialize(CommentDto)
  async create(@Body() body: CreateCommentDto) {
    return await this.commentsService.create(body);
  }

  @Roles('estudante', 'monitor', 'professor', 'admin')
  @Patch('/:id')
  @Serialize(CommentDto)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateCommentDto,
  ) {
    return await this.commentsService.update(id, body);
  }

  @Roles('estudante', 'monitor', 'professor', 'admin')
  @Delete('delete/:id')
  @Serialize(CommentDto)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.commentsService.delete(id);
  }

  @Roles('admin')
  @Delete('/:id')
  @Serialize(CommentDto)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.commentsService.remove(id);
  }
}
