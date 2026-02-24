import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { ProductConfigService } from '../services/product-config.service';
import { CreateProductConfigDto } from '../dto/product-config.dto';
import { ProductConfig } from '../entities/product-config.entity';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../auth/guards/permissions.guard';
import { RequirePermissions } from '../../auth/decorators/permissions.decorator';
import { Permissions } from '../../auth/auth.permissions';

@ApiTags('product-configs')
@Controller('tools/product-configs')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class ProductConfigController {
    constructor(private readonly service: ProductConfigService) { }

    @Post()
    @RequirePermissions(Permissions.READ_PRINTER) // Allowing standard users to create their configs
    @ApiOperation({ summary: 'Create product configuration' })
    @ApiBody({ type: CreateProductConfigDto })
    @ApiResponse({ status: 201, description: 'Product config created', type: ProductConfig })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    create(@Body() dto: CreateProductConfigDto): Promise<ProductConfig> {
        return this.service.calculateAndSave(dto);
    }

    @Get()
    @RequirePermissions(Permissions.READ_PRINTER)
    @ApiOperation({ summary: 'Get all product configurations' })
    @ApiResponse({ status: 200, description: 'List of product configs', type: [ProductConfig] })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    findAll(): Promise<ProductConfig[]> {
        return this.service.findAll();
    }

    @Get(':id')
    @RequirePermissions(Permissions.READ_PRINTER)
    @ApiOperation({ summary: 'Get product configuration by ID' })
    @ApiParam({ name: 'id', description: 'Product config ID' })
    @ApiResponse({ status: 200, description: 'Product config found', type: ProductConfig })
    @ApiResponse({ status: 404, description: 'Product config not found' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    findOne(@Param('id') id: string): Promise<ProductConfig> {
        return this.service.findOne(id);
    }

    @Delete(':id')
    @RequirePermissions(Permissions.READ_PRINTER)
    @ApiOperation({ summary: 'Delete product configuration by ID' })
    @ApiParam({ name: 'id', description: 'Product config ID' })
    @ApiResponse({ status: 200, description: 'Product config deleted' })
    @ApiResponse({ status: 404, description: 'Product config not found' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    remove(@Param('id') id: string): Promise<void> {
        return this.service.remove(id);
    }
}
