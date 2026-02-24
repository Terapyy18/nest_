import { IsString, IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateShippingProfileDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @Min(0)
    carrierCost: number;

    @IsNumber()
    @Min(0)
    @IsOptional()
    packagingCost: number = 0;
}

export class UpdateShippingProfileDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    name?: string;

    @IsNumber()
    @Min(0)
    @IsOptional()
    carrierCost?: number;

    @IsNumber()
    @Min(0)
    @IsOptional()
    packagingCost?: number;
}
