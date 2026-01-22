import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Printer } from '../printers/entities/Printer.entity';
import { PrinterController } from './printer.controller';
import { PrinterService } from './printer.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Printer,
        ]),
    ],
    controllers: [PrinterController],
    providers: [PrinterService],
    exports: [PrinterService], // Export PrinterService
})
export class PrinterModule { }
