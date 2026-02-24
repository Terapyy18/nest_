import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RscPrinter } from '../printers/entities/printer.entity';
import { PrinterController } from './printer.controller';
import { PrinterService } from './printer.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            RscPrinter,
        ]),
    ],
    controllers: [PrinterController],
    providers: [PrinterService],
    exports: [PrinterService], // Export PrinterService
})
export class PrinterModule { }
