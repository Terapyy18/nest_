
import { Controller, Get, HttpCode, HttpStatus, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { MaterialService } from './material.service';
import { CreateMaterialDto } from './types/material.dto';
import { MaterialPresenter } from './types/material.presenter';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../auth/guards/permissions.guard';
import { RequirePermissions } from '../../auth/decorators/permissions.decorator';
import { Permissions } from '../../auth/auth.permissions';

@ApiTags('materials')
@Controller('material')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class MaterialController {
    constructor(private readonly materialService: MaterialService) { }

    @Post()
    @RequirePermissions(Permissions.MANAGE_MATERIAL)
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create a new material' })
    @ApiBody({ type: CreateMaterialDto })
    @ApiResponse({ status: 201, description: 'Material created successfully', type: MaterialPresenter })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async create(@Body() createMaterialDto: CreateMaterialDto): Promise<MaterialPresenter> {
        const material = await this.materialService.create(createMaterialDto);
        return plainToInstance(MaterialPresenter, material, { excludeExtraneousValues: true });
    }

    @Get()
    @RequirePermissions(Permissions.READ_MATERIAL)
    @ApiOperation({ summary: 'Get all materials' })
    @ApiResponse({ status: 200, description: 'List of materials', type: [MaterialPresenter] })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async findAll(): Promise<MaterialPresenter[]> {
        const materials = await this.materialService.findAll();
        return materials.map(m => plainToInstance(MaterialPresenter, m, { excludeExtraneousValues: true }));
    }

    @Get(':id')
    @RequirePermissions(Permissions.READ_MATERIAL)
    @ApiOperation({ summary: 'Get material by ID' })
    @ApiParam({ name: 'id', description: 'Material ID' })
    @ApiResponse({ status: 200, description: 'Material found', type: MaterialPresenter })
    @ApiResponse({ status: 404, description: 'Material not found' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async findOne(@Param('id') id: string): Promise<MaterialPresenter> {
        const material = await this.materialService.findOne(id);
        return plainToInstance(MaterialPresenter, material, { excludeExtraneousValues: true });
    }

    @Put(':id')
    @RequirePermissions(Permissions.MANAGE_MATERIAL)
    @ApiOperation({ summary: 'Update material by ID' })
    @ApiParam({ name: 'id', description: 'Material ID' })
    @ApiBody({ type: CreateMaterialDto })
    @ApiResponse({ status: 200, description: 'Material updated successfully', type: MaterialPresenter })
    @ApiResponse({ status: 404, description: 'Material not found' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
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
    @ApiOperation({ summary: 'Delete material by ID' })
    @ApiParam({ name: 'id', description: 'Material ID' })
    @ApiResponse({ status: 204, description: 'Material deleted successfully' })
    @ApiResponse({ status: 404, description: 'Material not found' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async remove(@Param('id') id: string): Promise<void> {
        await this.materialService.remove(id);
    }
}
