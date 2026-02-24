import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RscMaterial } from '../ressources/materials/entities/material.entity';
import { RscPrinter } from '../ressources/printers/entities/printer.entity';
import { RscSalesChannel } from './entities/sales-channel.entity';
import { RscShippingProfile } from './entities/shipping-profile.entity';
import { PricingRequestDto, PricingResult } from './pricing.dto';

@Injectable()
export class PricingService {
    constructor(
        @InjectRepository(RscMaterial)
        private readonly materialRepository: Repository<RscMaterial>,
        @InjectRepository(RscPrinter)
        private readonly printerRepository: Repository<RscPrinter>,
        @InjectRepository(RscSalesChannel)
        private readonly salesChannelRepository: Repository<RscSalesChannel>,
        @InjectRepository(RscShippingProfile)
        private readonly shippingProfileRepository: Repository<RscShippingProfile>,
    ) { }

    async calculatePrice(dto: PricingRequestDto): Promise<PricingResult> {
        const material = await this.materialRepository.findOne({ where: { id: dto.materialId } });
        if (!material) throw new NotFoundException('Material not found');

        const printer = await this.printerRepository.findOne({ where: { id: dto.printerId } });
        if (!printer) throw new NotFoundException('Printer not found');

        const salesChannel = await this.salesChannelRepository.findOne({ where: { id: dto.salesChannelId } });
        if (!salesChannel) throw new NotFoundException('SalesChannel not found');

        const shippingProfile = await this.shippingProfileRepository.findOne({ where: { id: dto.shippingProfileId } });
        if (!shippingProfile) throw new NotFoundException('ShippingProfile not found');

        // --- Calculation Logic ---

        // 1. Material Cost
        const materialCost = (Number(material.price) / material.weightGrams) * dto.weightGrams;

        // 2. Energy Cost
        const electricityPrice = dto.electricityPrice || 0.20; // Default 0.20€/kWh
        const energyCost = (Number(printer.powerConsumptionWatts) / 1000) * dto.printTimeHours * electricityPrice;

        const depreciationCost = 0;
        // 4. Maintenance Cost
        const maintenanceCost = Number(printer.maintenanceHourlyCost) * dto.printTimeHours;

        // 5. Logistics Cost (Carrier + Packaging)
        const logisticsCost = Number(shippingProfile.carrierCost) + Number(shippingProfile.packagingCost);

        // 6. Total Base Cost
        const totalBaseCost = materialCost + energyCost + depreciationCost + maintenanceCost + logisticsCost;

        // 7. Target Net Price (with margin)
        const targetNetPrice = totalBaseCost * (1 + dto.desiredMargin);
        const marginValue = targetNetPrice - totalBaseCost;

        // 8. Platform Fees
        const commissionRate = Number(salesChannel.commissionPercentage);
        const fixedFee = Number(salesChannel.fixedTransactionFee);
        // 9. Final Public Price (including platform fees)
        const finalPublicPrice = (targetNetPrice + fixedFee) / (1 - commissionRate);
        const platformCommission = finalPublicPrice * commissionRate;

        return {
            breakdown: {
                materialCost,
                energyCost,
                depreciationCost,
                maintenanceCost,
                logisticsCost,
                laborCost: 0,
                totalBaseCost,
            },
            margin: {
                marginPercentage: dto.desiredMargin,
                marginValue,
            },
            fees: {
                platformCommission,
                fixedFee,
            },
            finalPrice: {
                targetNetPrice,
                finalPublicPrice,
            },
        };
    }
}
