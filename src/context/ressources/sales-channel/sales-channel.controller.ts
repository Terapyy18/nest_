import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { SalesChannelService } from './sales-channel.service';
import { CreateSalesChannelDto, UpdateSalesChannelDto } from '../../pricing/dto/sales-channel.dto';
import { RscSalesChannel } from '../../pricing/entities/sales-channel.entity';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../auth/guards/permissions.guard';
import { RequirePermissions } from '../../auth/decorators/permissions.decorator';
import { Permissions } from '../../auth/auth.permissions';

@ApiTags('sales-channels')
@Controller('tools/sales-channels')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class SalesChannelController {
    constructor(private readonly salesChannelService: SalesChannelService) { }

    @Post()
    @RequirePermissions(Permissions.MANAGE_PRINTER)
    @ApiOperation({ summary: 'Create sales channel' })
    @ApiBody({ type: CreateSalesChannelDto })
    @ApiResponse({ status: 201, description: 'Sales channel created', type: RscSalesChannel })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    create(@Body() dto: CreateSalesChannelDto): Promise<RscSalesChannel> {
        return this.salesChannelService.create(dto);
    }

    @Get()
    @RequirePermissions(Permissions.READ_PRINTER)
    @ApiOperation({ summary: 'Get all sales channels' })
    @ApiResponse({ status: 200, description: 'List of sales channels', type: [RscSalesChannel] })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    findAll(): Promise<RscSalesChannel[]> {
        return this.salesChannelService.findAll();
    }

    @Get(':id')
    @RequirePermissions(Permissions.READ_PRINTER)
    @ApiOperation({ summary: 'Get sales channel by ID' })
    @ApiParam({ name: 'id', description: 'Sales channel ID' })
    @ApiResponse({ status: 200, description: 'Sales channel found', type: RscSalesChannel })
    @ApiResponse({ status: 404, description: 'Sales channel not found' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    findOne(@Param('id') id: string): Promise<RscSalesChannel> {
        return this.salesChannelService.findOne(id);
    }

    @Put(':id')
    @RequirePermissions(Permissions.MANAGE_PRINTER)
    @ApiOperation({ summary: 'Update sales channel by ID' })
    @ApiParam({ name: 'id', description: 'Sales channel ID' })
    @ApiBody({ type: UpdateSalesChannelDto })
    @ApiResponse({ status: 200, description: 'Sales channel updated', type: RscSalesChannel })
    @ApiResponse({ status: 404, description: 'Sales channel not found' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    update(@Param('id') id: string, @Body() dto: UpdateSalesChannelDto): Promise<RscSalesChannel> {
        return this.salesChannelService.update(id, dto);
    }

    @Delete(':id')
    @RequirePermissions(Permissions.MANAGE_PRINTER)
    @ApiOperation({ summary: 'Delete sales channel by ID' })
    @ApiParam({ name: 'id', description: 'Sales channel ID' })
    @ApiResponse({ status: 200, description: 'Sales channel deleted' })
    @ApiResponse({ status: 404, description: 'Sales channel not found' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    remove(@Param('id') id: string): Promise<void> {
        return this.salesChannelService.remove(id);
    }
}
