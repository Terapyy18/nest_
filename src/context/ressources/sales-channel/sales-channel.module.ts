import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RscSalesChannel } from '../../pricing/entities/sales-channel.entity';
import { SalesChannelService } from './sales-channel.service';
import { SalesChannelController } from './sales-channel.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RscSalesChannel])],
  providers: [SalesChannelService],
  controllers: [SalesChannelController],
  exports: [SalesChannelService],
})
export class SalesChannelModule {}
