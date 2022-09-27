import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { CreateCommentDTO } from './dtos/create-comment.dto';
import { UpdateCommentDTO } from './dtos/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
  ) {}

  private allRelations = [
    'user',
    'comment',
    'subComments',
    'commentFiles',
    'topic',
  ];

  findById(id: number) {
    if (!id) return null;

    return this.commentsRepository.findOne({
      where: { id, active: true },
      relations: this.allRelations,
    });
  }

  findAll() {
    return this.commentsRepository.find({
      where: { active: true },
      relations: this.allRelations,
    });
  }

  create(body: CreateCommentDTO) {
    const newComment = this.commentsRepository.create({
      createdAt: new Date(),
      ...body,
    });

    return this.commentsRepository.save(newComment);
  }

  async update(id: number, body: UpdateCommentDTO) {
    const comment = await this.findById(id);

    if (!comment) throw new NotFoundException('Comment not found.');

    const attrs: Partial<Comment> = body;

    comment.updatedAt = new Date();

    Object.assign(comment, attrs);

    return this.commentsRepository.save(comment);
  }

  async delete(id: number) {
    const comment = await this.findById(id);

    if (!comment) throw new NotFoundException('Comment not found.');

    comment.updatedAt = new Date();
    comment.active = false;

    return this.commentsRepository.save(comment);
  }

  async remove(id: number) {
    const comment = await this.findById(id);

    if (!comment) throw new NotFoundException('Comment not found.');

    return this.commentsRepository.remove(comment);
  }
}
