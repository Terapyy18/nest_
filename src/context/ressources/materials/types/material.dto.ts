import { IsString, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMaterialDto {
    @ApiProperty({ description: 'Material brand', example: 'PLA' })
    @IsString()
    @IsNotEmpty()
    brand: string;

    @ApiProperty({ description: 'Material type', example: 'Filament' })
    @IsString()
    @IsNotEmpty()
    type: string;

    @ApiProperty({ description: 'Material price per unit', example: 25.99 })
    @IsNumber()
    @IsPositive()
    price: number;
}
