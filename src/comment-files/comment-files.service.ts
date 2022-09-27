import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentFile } from './comment-file.entity';
import { CreateCommentFileDTO } from './dtos/create-comment-file.dto';
import { UpdateCommentFileDTO } from './dtos/update-comment-file.dto';

@Injectable()
export class CommentFilesService {
  constructor(
    @InjectRepository(CommentFile)
    private commentFilesRepository: Repository<CommentFile>,
  ) {}

  private allRelations = ['comment'];

  findById(id: number) {
    if (!id) return null;

    return this.commentFilesRepository.findOne({
      where: { id, active: true },
      relations: this.allRelations,
    });
  }

  findAll() {
    return this.commentFilesRepository.find({
      where: { active: true },
      relations: this.allRelations,
    });
  }

  create(body: CreateCommentFileDTO) {
    const newCommentFile = this.commentFilesRepository.create({
      ...body,
    });

    return this.commentFilesRepository.save(newCommentFile);
  }

  async update(id: number, body: UpdateCommentFileDTO) {
    const commentFile = await this.findById(id);

    if (!commentFile) throw new NotFoundException('Comment file not found.');

    const attrs: Partial<CommentFile> = body;

    commentFile.updatedAt = new Date();

    Object.assign(commentFile, attrs);

    return this.commentFilesRepository.save(commentFile);
  }

  async delete(id: number) {
    const commentFile = await this.findById(id);

    if (!commentFile) throw new NotFoundException('Comment file not found.');

    commentFile.updatedAt = new Date();
    commentFile.active = false;

    return this.commentFilesRepository.save(commentFile);
  }

  async remove(id: number) {
    const commentFile = await this.findById(id);

    if (!commentFile) throw new NotFoundException('Comment file not found.');

    return this.commentFilesRepository.remove(commentFile);
  }
}
