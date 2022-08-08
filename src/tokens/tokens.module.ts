import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from './token.entity';
import { TokensService } from './tokens.service';
import { TokensController } from './tokens.controller';

@Module({
  providers: [TokensService],
  controllers: [TokensController],
  imports: [TypeOrmModule.forFeature([Token])],
  exports: [TokensService],
})
export class TokensModule {}
