import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Address } from './address.entity';
import { AddressesController } from './addresses.controller';
import { AddressesService } from './addresses.service';

@Module({
  providers: [AddressesService],
  controllers: [AddressesController],
  imports: [TypeOrmModule.forFeature([Address, User])],
  exports: [AddressesService],
})
export class AddressesModule {}
