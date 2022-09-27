import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from './token.entity';
import { TokensService } from './tokens.service';

@Module({
  providers: [TokensService],
  imports: [TypeOrmModule.forFeature([Token])],
  exports: [TokensService],
})
export class TokensModule {}
