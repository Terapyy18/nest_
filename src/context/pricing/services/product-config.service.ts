import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductConfig } from '../entities/product-config.entity';
import { ProductConfigPart } from '../entities/product-config-part.entity';
import { CreateProductConfigDto } from '../dto/product-config.dto';
import { RscMaterial } from '../../ressources/materials/entities/material.entity';
import { RscPrinter } from '../../ressources/printers/entities/printer.entity';
import { RscSalesChannel } from '../entities/sales-channel.entity';
import { RscShippingProfile } from '../entities/shipping-profile.entity';
import { PricingService } from '../pricing.service';
import { PricingRequestDto } from '../pricing.dto';

@Injectable()
export class ProductConfigService {
    constructor(
        @InjectRepository(ProductConfig)
        private readonly productConfigRepository: Repository<ProductConfig>,
        @InjectRepository(ProductConfigPart)
        private readonly partRepository: Repository<ProductConfigPart>,
        @InjectRepository(RscMaterial)
        private readonly materialRepository: Repository<RscMaterial>,
        @InjectRepository(RscPrinter)
        private readonly printerRepository: Repository<RscPrinter>,
        @InjectRepository(RscSalesChannel)
        private readonly salesChannelRepository: Repository<RscSalesChannel>,
        @InjectRepository(RscShippingProfile)
        private readonly shippingProfileRepository: Repository<RscShippingProfile>,
        private readonly pricingService: PricingService,
    ) { }

    async calculateAndSave(dto: CreateProductConfigDto): Promise<ProductConfig> {
        // 1. Create the parent config
        const config = new ProductConfig();
        config.name = dto.name;
        config.salesChannelId = dto.salesChannelId;
        config.shippingProfileId = dto.shippingProfileId;
        config.otherCosts = dto.otherCosts || 0;
        config.desiredMargin = dto.desiredMargin;
        config.electricityPrice = dto.electricityPrice;

        // Fetch related entities for calculation
        const salesChannel = await this.salesChannelRepository.findOne({ where: { id: dto.salesChannelId } });
        if (!salesChannel) throw new NotFoundException('SalesChannel not found');

        const shippingProfile = await this.shippingProfileRepository.findOne({ where: { id: dto.shippingProfileId } });
        if (!shippingProfile) throw new NotFoundException('ShippingProfile not found');

        // 2. Process parts and calculate costs
        let totalMaterialCost = 0;
        let totalEnergyCost = 0;
        let totalDepreciationCost = 0;
        let totalMaintenanceCost = 0;

        const parts: ProductConfigPart[] = [];

        for (const partDto of dto.parts) {
            const part = new ProductConfigPart();
            part.name = partDto.name;
            part.printerId = partDto.printerId;
            part.materialId = partDto.materialId;
            part.printTimeHours = partDto.printTimeHours;
            part.weightGrams = partDto.weightGrams;

            parts.push(part);

            const printer = await this.printerRepository.findOne({ where: { id: partDto.printerId } });
            if (!printer) throw new NotFoundException(`Printer ${partDto.printerId} not found`);

            const material = await this.materialRepository.findOne({ where: { id: partDto.materialId } });
            if (!material) throw new NotFoundException(`Material ${partDto.materialId} not found`);

            // Material
            totalMaterialCost += (Number(material.price) / material.weightGrams) * part.weightGrams;

            // Energy
            totalEnergyCost += (Number(printer.powerConsumptionWatts) / 1000) * part.printTimeHours * config.electricityPrice;

            // Maintenance
            totalMaintenanceCost += Number(printer.maintenanceHourlyCost) * part.printTimeHours;
        }

        // 3. Logistics Cost (Once per product)
        const logisticsCost = Number(shippingProfile.carrierCost) + Number(shippingProfile.packagingCost);

        // 4. Total Cost Calculation
        // Sum parts + logistics + other fixed costs
        const totalBaseCost = totalMaterialCost + totalEnergyCost + totalMaintenanceCost + logisticsCost + Number(config.otherCosts);

        config.totalCost = totalBaseCost;

        // 5. Final Price Calculation
        const targetNetPrice = totalBaseCost * (1 + Number(config.desiredMargin));

        const commissionRate = Number(salesChannel.commissionPercentage);
        const fixedFee = Number(salesChannel.fixedTransactionFee);

        const finalPublicPrice = (targetNetPrice + fixedFee) / (1 - commissionRate);

        config.finalPrice = finalPublicPrice;
        config.parts = parts;

        // Save everything
        return this.productConfigRepository.save(config);
    }

    async findAll(): Promise<ProductConfig[]> {
        return this.productConfigRepository.find({ relations: ['parts', 'salesChannel', 'shippingProfile'] });
    }

    async findOne(id: string): Promise<ProductConfig> {
        const config = await this.productConfigRepository.findOne({
            where: { id },
            relations: ['parts', 'salesChannel', 'shippingProfile', 'parts.printer', 'parts.material']
        });
        if (!config) throw new NotFoundException(`ProductConfig ${id} not found`);
        return config;
    }

    async remove(id: string): Promise<void> {
        await this.productConfigRepository.delete(id);
    }
}
