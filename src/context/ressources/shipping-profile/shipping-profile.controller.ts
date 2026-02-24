import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { ShippingProfileService } from './shipping-profile.service';
import { CreateShippingProfileDto, UpdateShippingProfileDto } from '../../pricing/dto/shipping-profile.dto';
import { RscShippingProfile } from '../../pricing/entities/shipping-profile.entity';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../auth/guards/permissions.guard';
import { RequirePermissions } from '../../auth/decorators/permissions.decorator';
import { Permissions } from '../../auth/auth.permissions';

@Controller('tools/shipping-profiles')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class ShippingProfileController {
    constructor(private readonly shippingProfileService: ShippingProfileService) { }

    @Post()
    @RequirePermissions(Permissions.MANAGE_PRINTER)
    create(@Body() dto: CreateShippingProfileDto): Promise<RscShippingProfile> {
        return this.shippingProfileService.create(dto);
    }

    @Get()
    @RequirePermissions(Permissions.READ_PRINTER)
    findAll(): Promise<RscShippingProfile[]> {
        return this.shippingProfileService.findAll();
    }

    @Get(':id')
    @RequirePermissions(Permissions.READ_PRINTER)
    findOne(@Param('id') id: string): Promise<RscShippingProfile> {
        return this.shippingProfileService.findOne(id);
    }

    @Put(':id')
    @RequirePermissions(Permissions.MANAGE_PRINTER)
    update(@Param('id') id: string, @Body() dto: UpdateShippingProfileDto): Promise<RscShippingProfile> {
        return this.shippingProfileService.update(id, dto);
    }

    @Delete(':id')
    @RequirePermissions(Permissions.MANAGE_PRINTER)
    remove(@Param('id') id: string): Promise<void> {
        return this.shippingProfileService.remove(id);
    }
}
