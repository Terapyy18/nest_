import { Injectable } from '@nestjs/common';
import { MaterialService } from './materials/material.service';
import { PrinterService } from './printers/printer.service';
import { SalesChannelService } from './sales-channel/sales-channel.service';
import { ShippingProfileService } from './shipping-profile/shipping-profile.service';
import { ProfileService } from '../profil/profile.service';

@Injectable()
export class RessourcesService {
  constructor(
    private readonly materialService: MaterialService,
    private readonly printerService: PrinterService,
    private readonly salesChannelService: SalesChannelService,
    private readonly shippingProfileService: ShippingProfileService,
    private readonly profileService: ProfileService,
  ) {}

  async getAllRessources() {
    const [materials, printers, salesChannels, shippingProfiles, profiles] = await Promise.all([
      this.materialService.findAll(),
      this.printerService.findAll(),
      this.salesChannelService.findAll(),
      this.shippingProfileService.findAll(),
      this.profileService.findAll(),
    ]);

    return {
      materials,
      printers,
      salesChannels,
      shippingProfiles,
      profiles,
    };
  }
}
