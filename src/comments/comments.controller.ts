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
import { CommentsService } from './comments.service';
import { CreateCommentDTO } from './dtos/create-comment.dto';
import { UpdateCommentDTO } from './dtos/update-comment.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Roles('monitor', 'professor', 'admin')
  @Get('/:id')
  async findById(@Param('id') id: string) {
    const comment = await this.commentsService.findById(parseInt(id));

    if (!comment) throw new NotFoundException('Comment not found.');

    return comment;
  }

  @Roles('monitor', 'professor', 'admin')
  @Get()
  findAll() {
    return this.commentsService.findAll();
  }

  @Roles('estudante', 'monitor', 'professor', 'admin')
  @Post()
  create(@Body() body: CreateCommentDTO) {
    return this.commentsService.create(body);
  }

  @Roles('estudante', 'monitor', 'professor', 'admin')
  @Patch('/:id')
  async update(@Param('id') id: string, @Body() body: UpdateCommentDTO) {
    return await this.commentsService.update(parseInt(id), body);
  }

  @Roles('estudante', 'monitor', 'professor', 'admin')
  @Patch('delete/:id')
  async delete(@Param('id') id: string) {
    return await this.commentsService.delete(parseInt(id));
  }

  @Roles('admin')
  @Delete('/:id')
  async remove(@Param('id') id: string) {
    return await this.commentsService.remove(parseInt(id));
  }
}
