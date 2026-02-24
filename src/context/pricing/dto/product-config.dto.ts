import { IsString, IsNotEmpty, IsNumber, IsOptional, IsArray, ValidateNested, Min, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductConfigPartDto {
    @IsString()
    @IsOptional()
    name: string = 'New Part';

    @IsUUID()
    @IsNotEmpty()
    printerId: string;

    @IsUUID()
    @IsNotEmpty()
    materialId: string;

    @IsNumber()
    @Min(0)
    printTimeHours: number;

    @IsNumber()
    @Min(0)
    weightGrams: number;
}

export class CreateProductConfigDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsUUID()
    @IsNotEmpty()
    salesChannelId: string;

    @IsUUID()
    @IsNotEmpty()
    shippingProfileId: string;

    @IsNumber()
    @Min(0)
    @IsOptional()
    otherCosts: number = 0;

    @IsNumber()
    @IsOptional()
    desiredMargin: number = 0.20;

    @IsNumber()
    @IsOptional()
    electricityPrice: number = 0.20;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateProductConfigPartDto)
    parts: CreateProductConfigPartDto[];
}

export class UpdateProductConfigDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    status?: string;

    // Add other fields if needed for update
}
