import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { PricingService } from './pricing.service';
import { PricingRequestDto, PricingResult, PricingResultDto } from './pricing.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { RequirePermissions } from '../auth/decorators/permissions.decorator';
import { Permissions } from '../auth/auth.permissions';

@ApiTags('pricing')
@Controller('tools/pricing')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class PricingController {
    constructor(private readonly pricingService: PricingService) { }

    @Post('quote')
    @RequirePermissions(Permissions.READ_MATERIAL, Permissions.READ_PRINTER)
    @ApiOperation({ summary: 'Get pricing quote' })
    @ApiBody({ type: PricingRequestDto })
    @ApiResponse({ status: 200, description: 'Pricing quote calculated', type: PricingResultDto })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async getQuote(@Body() dto: PricingRequestDto): Promise<PricingResult> {
        return this.pricingService.calculatePrice(dto);
    }
}
