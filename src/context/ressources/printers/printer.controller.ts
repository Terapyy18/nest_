
import { Controller, Get, HttpCode, HttpStatus, Body, Post, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { CreatePrinterDto } from './types/printer.dto';
import { PrinterPresenter } from './types/printer.presenter';
import { plainToInstance } from 'class-transformer';
import { PrinterService } from './printer.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../auth/guards/permissions.guard';
import { RequirePermissions } from '../../auth/decorators/permissions.decorator';
import { Permissions } from '../../auth/auth.permissions';

@ApiTags('printers')
@Controller('printer')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class PrinterController {
  constructor(private readonly printerService: PrinterService) { }

  @Post()
  @RequirePermissions(Permissions.MANAGE_PRINTER)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new printer' })
  @ApiBody({ type: CreatePrinterDto })
  @ApiResponse({ status: 201, description: 'Printer created successfully', type: PrinterPresenter })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(@Body() createDto: CreatePrinterDto): Promise<PrinterPresenter> {
    const printer = await this.printerService.create(createDto);
    return plainToInstance(PrinterPresenter, printer, { excludeExtraneousValues: true });
  }

  @Get()
  @RequirePermissions(Permissions.READ_PRINTER)
  @ApiOperation({ summary: 'Get all printers' })
  @ApiResponse({ status: 200, description: 'List of printers', type: [PrinterPresenter] })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findAll(): Promise<PrinterPresenter[]> {
    const printers = await this.printerService.findAll();
    return printers.map(p => plainToInstance(PrinterPresenter, p, { excludeExtraneousValues: true }));
  }

  @Get(':id')
  @RequirePermissions(Permissions.READ_PRINTER)
  @ApiOperation({ summary: 'Get printer by ID' })
  @ApiParam({ name: 'id', description: 'Printer ID' })
  @ApiResponse({ status: 200, description: 'Printer found', type: PrinterPresenter })
  @ApiResponse({ status: 404, description: 'Printer not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findOne(@Param('id') id: string): Promise<PrinterPresenter> {
    const printer = await this.printerService.findById(id);
    return plainToInstance(PrinterPresenter, printer, { excludeExtraneousValues: true });
  }

  @Put(':id')
  @RequirePermissions(Permissions.MANAGE_PRINTER)
  @ApiOperation({ summary: 'Update printer by ID' })
  @ApiParam({ name: 'id', description: 'Printer ID' })
  @ApiBody({ type: CreatePrinterDto })
  @ApiResponse({ status: 200, description: 'Printer updated successfully', type: PrinterPresenter })
  @ApiResponse({ status: 404, description: 'Printer not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async update(
    @Param('id') id: string,
    @Body() updateDto: Partial<CreatePrinterDto>
  ): Promise<PrinterPresenter> {
    const printer = await this.printerService.update(id, updateDto);
    return plainToInstance(PrinterPresenter, printer, { excludeExtraneousValues: true });
  }

  @Delete(':id')
  @RequirePermissions(Permissions.MANAGE_PRINTER)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete printer by ID' })
  @ApiParam({ name: 'id', description: 'Printer ID' })
  @ApiResponse({ status: 204, description: 'Printer deleted successfully' })
  @ApiResponse({ status: 404, description: 'Printer not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.printerService.remove(id);
  }
}
