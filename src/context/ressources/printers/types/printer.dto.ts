import { IsString, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreatePrinterDto {
    @IsString()
    @IsNotEmpty()
    brand: string;

    @IsString()
    @IsNotEmpty()
    model: string;

    @IsNumber()
    @IsPositive()
    powerConsumptionWatts: number;

    @IsString()
    @IsNotEmpty()
    technologyType: string;
}
