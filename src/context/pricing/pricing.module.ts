import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PricingService } from './pricing.service';
import { PricingController } from './pricing.controller';
import { RscMaterial } from '../ressources/materials/entities/material.entity';
import { RscPrinter } from '../ressources/printers/entities/printer.entity';
import { RscSalesChannel } from './entities/sales-channel.entity';
import { RscShippingProfile } from './entities/shipping-profile.entity';
import { authModule } from '../auth/auth.module';
import { ProductConfig } from './entities/product-config.entity';
import { ProductConfigPart } from './entities/product-config-part.entity';
import { ProductConfigController } from './controllers/product-config.controller';
import { ProductConfigService } from './services/product-config.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            RscMaterial,
            RscPrinter,
            RscSalesChannel,
            RscShippingProfile,
            ProductConfig,
            ProductConfigPart
        ]),
        authModule,
    ],
    controllers: [
        PricingController,
        ProductConfigController
    ],
    providers: [
        PricingService,
        ProductConfigService
    ],
    exports: [PricingService, ProductConfigService],
})
export class PricingModule { }
