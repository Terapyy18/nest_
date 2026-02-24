import { Module } from '@nestjs/common';
import { RessourcesService } from './ressources.service';
import { RessourcesController } from './ressources.controller';
import { MaterialModule } from './materials/material.module';
import { PrinterModule } from './printers/printer.module';
import { SalesChannelModule } from './sales-channel/sales-channel.module';
import { ShippingProfileModule } from './shipping-profile/shipping-profile.module';
import { ProfilModule } from '../profil/profil.module';

@Module({
  imports: [MaterialModule, PrinterModule, SalesChannelModule, ShippingProfileModule, ProfilModule],
  providers: [RessourcesService],
  controllers: [RessourcesController],
  exports: [RessourcesService],
})
export class RessourcesModule {}
