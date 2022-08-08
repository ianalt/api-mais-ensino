import { Module } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { AddressesController } from './addresses.controller';
import { Address } from './address.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';

@Module({
  providers: [AddressesService],
  controllers: [AddressesController],
  imports: [TypeOrmModule.forFeature([Address, User])],
  exports: [AddressesService],
})
export class AddressesModule {}
