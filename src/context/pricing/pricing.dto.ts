
import { ApiProperty } from '@nestjs/swagger';

export interface PricingResult {
    breakdown: {
        materialCost: number;
        energyCost: number;
        depreciationCost: number;
        maintenanceCost: number;
        logisticsCost: number;
        laborCost: number;
        totalBaseCost: number;
    };
    margin: {
        marginPercentage: number;
        marginValue: number;
    };
    fees: {
        platformCommission: number;
        fixedFee: number;
    };
    finalPrice: {
        targetNetPrice: number;
        finalPublicPrice: number;
    };
}

export class PricingResultDto {
    @ApiProperty({
        example: {
            materialCost: 10,
            energyCost: 2,
            depreciationCost: 1,
            maintenanceCost: 0.5,
            logisticsCost: 1,
            laborCost: 3,
            totalBaseCost: 17.5
        }
    })
    breakdown: {
        materialCost: number;
        energyCost: number;
        depreciationCost: number;
        maintenanceCost: number;
        logisticsCost: number;
        laborCost: number;
        totalBaseCost: number;
    };

    @ApiProperty({
        example: {
            marginPercentage: 20,
            marginValue: 3.5
        }
    })
    margin: {
        marginPercentage: number;
        marginValue: number;
    };

    @ApiProperty({
        example: {
            platformCommission: 1,
            fixedFee: 0.5
        }
    })
    fees: {
        platformCommission: number;
        fixedFee: number;
    };

    @ApiProperty({
        example: {
            targetNetPrice: 21,
            finalPublicPrice: 25
        }
    })
    finalPrice: {
        targetNetPrice: number;
        finalPublicPrice: number;
    };
}

export class PricingRequestDto {
    printerId: string;
    materialId: string;
    salesChannelId: string;
    shippingProfileId: string;

    printTimeHours: number;
    weightGrams: number;

    desiredMargin: number;
    electricityPrice: number = 0.20;
}
