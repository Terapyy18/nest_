
import { Controller, Get, HttpCode, HttpStatus, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { MaterialService } from './material.service';
import { CreateMaterialDto } from './types/material.dto';
import { MaterialPresenter } from './types/material.presenter';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../auth/guards/permissions.guard';
import { RequirePermissions } from '../../auth/decorators/permissions.decorator';
import { Permissions } from '../../auth/auth.permissions';

@Controller('material')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class MaterialController {
    constructor(private readonly materialService: MaterialService) { }

    @Post()
    @RequirePermissions(Permissions.MANAGE_MATERIAL)
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createMaterialDto: CreateMaterialDto): Promise<MaterialPresenter> {
        const material = await this.materialService.create(createMaterialDto);
        return plainToInstance(MaterialPresenter, material, { excludeExtraneousValues: true });
    }

    @Get()
    @RequirePermissions(Permissions.READ_MATERIAL)
    async findAll(): Promise<MaterialPresenter[]> {
        const materials = await this.materialService.findAll();
        return materials.map(m => plainToInstance(MaterialPresenter, m, { excludeExtraneousValues: true }));
    }

    @Get(':id')
    @RequirePermissions(Permissions.READ_MATERIAL)
    async findOne(@Param('id') id: string): Promise<MaterialPresenter> {
        const material = await this.materialService.findOne(id);
        return plainToInstance(MaterialPresenter, material, { excludeExtraneousValues: true });
    }

    @Put(':id')
    @RequirePermissions(Permissions.MANAGE_MATERIAL)
    async update(
        @Param('id') id: string,
        @Body() updateDto: Partial<CreateMaterialDto>
    ): Promise<MaterialPresenter> {
        const material = await this.materialService.update(id, updateDto);
        return plainToInstance(MaterialPresenter, material, { excludeExtraneousValues: true });
    }

    @Delete(':id')
    @RequirePermissions(Permissions.MANAGE_MATERIAL)
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id') id: string): Promise<void> {
        await this.materialService.remove(id);
    }



}
