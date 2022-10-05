import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { CreateCommentDTO } from './dtos/create-comment.dto';
import { UpdateCommentDTO } from './dtos/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,

    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  private allRelations = [
    'user',
    'comment',
    'subComments',
    'commentFiles',
    'topic',
  ];

  findByID(id: number) {
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

  async create(body: CreateCommentDTO) {
    const { userID, ...attrs } = body;

    const user = await this.usersRepository.findOne({
      where: { active: true, id: userID },
    });

    if (!user) throw new NotFoundException('User not found.');

    const newComment = this.commentsRepository.create({
      ...attrs,
    });

    newComment.user = user;

    return this.commentsRepository.save(newComment);
  }

  async update(id: number, body: UpdateCommentDTO) {
    const comment = await this.findByID(id);

    if (!comment) throw new NotFoundException('Comment not found.');

    const { userID, ...values } = body;

    const user = await this.usersRepository.findOne({
      where: { active: true, id: userID },
    });

    if (!user) throw new NotFoundException('User not found.');

    const attrs: Partial<Comment> = values;

    comment.updatedAt = new Date();
    comment.user = user;

    Object.assign(comment, attrs);

    return this.commentsRepository.save(comment);
  }

  async delete(id: number) {
    const comment = await this.findByID(id);

    if (!comment) throw new NotFoundException('Comment not found.');

    comment.updatedAt = new Date();
    comment.active = false;

    return this.commentsRepository.save(comment);
  }

  async remove(id: number) {
    const comment = await this.findByID(id);

    if (!comment) throw new NotFoundException('Comment not found.');

    return this.commentsRepository.remove(comment);
  }
}
