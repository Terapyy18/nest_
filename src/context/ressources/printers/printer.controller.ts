
import { Controller, Get, HttpCode, HttpStatus, Body, Post, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { CreatePrinterDto } from './types/printer.dto';
import { PrinterPresenter } from './types/printer.presenter';
import { plainToInstance } from 'class-transformer';
import { PrinterService } from './printer.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../auth/guards/permissions.guard';
import { RequirePermissions } from '../../auth/decorators/permissions.decorator';
import { Permissions } from '../../auth/auth.permissions';

@Controller('printer')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class PrinterController {
  constructor(private readonly printerService: PrinterService) { }

  @Post()
  @RequirePermissions(Permissions.MANAGE_PRINTER)
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createDto: CreatePrinterDto): Promise<PrinterPresenter> {
    const printer = await this.printerService.create(createDto);
    return plainToInstance(PrinterPresenter, printer, { excludeExtraneousValues: true });
  }

  @Get()
  @RequirePermissions(Permissions.READ_PRINTER)
  async findAll(): Promise<PrinterPresenter[]> {
    const printers = await this.printerService.findAll();
    return printers.map(p => plainToInstance(PrinterPresenter, p, { excludeExtraneousValues: true }));
  }

  @Get(':id')
  @RequirePermissions(Permissions.READ_PRINTER)
  async findOne(@Param('id') id: string): Promise<PrinterPresenter> {
    const printer = await this.printerService.findById(id);
    return plainToInstance(PrinterPresenter, printer, { excludeExtraneousValues: true });
  }

  @Put(':id')
  @RequirePermissions(Permissions.MANAGE_PRINTER)
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
  async remove(@Param('id') id: string): Promise<void> {
    await this.printerService.remove(id);
  }


}
