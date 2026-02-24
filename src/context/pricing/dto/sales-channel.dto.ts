import { IsString, IsNotEmpty, IsNumber, IsBoolean, IsOptional, Max, Min } from 'class-validator';

export class CreateSalesChannelDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @Min(0)
    @Max(1)
    commissionPercentage: number; // 0.15 = 15%

    @IsNumber()
    @Min(0)
    fixedTransactionFee: number;

    @IsBoolean()
    @IsOptional()
    feesApplyToShipping: boolean = true;
}

export class UpdateSalesChannelDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    name?: string;

    @IsNumber()
    @Min(0)
    @Max(1)
    @IsOptional()
    commissionPercentage?: number;

    @IsNumber()
    @Min(0)
    @IsOptional()
    fixedTransactionFee?: number;

    @IsBoolean()
    @IsOptional()
    feesApplyToShipping?: boolean;
}
