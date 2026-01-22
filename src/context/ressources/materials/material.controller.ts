
import { Controller, Get, HttpCode, HttpStatus, Post, Body } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { MaterialService } from './material.service';
import { CreateMaterialDto } from './types/material.dto';
import { MaterialPresenter } from './types/material.presenter';

@Controller('materials')
export class MaterialController {
    constructor(private readonly materialService: MaterialService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createMaterialDto: CreateMaterialDto): Promise<MaterialPresenter> {
        const material = await this.materialService.create(createMaterialDto);
        return plainToInstance(MaterialPresenter, material, { excludeExtraneousValues: true });
    }

    @Post('ressources')
    @HttpCode(HttpStatus.OK)
    ListeRessources() {

        const Material = {
            brand: ["Prusament", "Hatchbox", "eSun"],
            Type: ["PLA", "PETG", "ABS"],
            price: [20, 25, 30],
        }
        return plainToInstance(MaterialPresenter, Material);
    }

}
