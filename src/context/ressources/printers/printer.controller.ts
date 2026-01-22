
import { Controller, Get, HttpCode, HttpStatus, Body, Post } from '@nestjs/common';
import { CreatePrinterDto } from './types/printer.dto';
import { PrinterPresenter } from './types/printer.presenter';
import { plainToInstance } from 'class-transformer';
import { PrinterService } from './printer.service';

@Controller('printer')
export class PrinterController {
  constructor(private readonly printerService: PrinterService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createDto: CreatePrinterDto): Promise<PrinterPresenter> {
    const printer = await this.printerService.create(createDto);
    return plainToInstance(PrinterPresenter, printer, { excludeExtraneousValues: true });
  }


}
