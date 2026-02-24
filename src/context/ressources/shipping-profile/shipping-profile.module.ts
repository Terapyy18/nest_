import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RscShippingProfile } from '../../pricing/entities/shipping-profile.entity';
import { ShippingProfileService } from './shipping-profile.service';
import { ShippingProfileController } from './shipping-profile.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RscShippingProfile])],
  providers: [ShippingProfileService],
  controllers: [ShippingProfileController],
  exports: [ShippingProfileService],
})
export class ShippingProfileModule {}
