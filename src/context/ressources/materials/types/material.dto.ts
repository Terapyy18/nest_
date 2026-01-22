import { IsString, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateMaterialDto {
    @IsString()
    @IsNotEmpty()
    brand: string;

    @IsString()
    @IsNotEmpty()
    type: string;

    @IsNumber()
    @IsPositive()
    price: number;
}
