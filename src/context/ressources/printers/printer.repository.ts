import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RscPrinter } from "./entities/printer.entity";

@Injectable()
export class PrinterRepository {
    constructor(
        @InjectRepository(RscPrinter)
        private readonly printerRepository: Repository<RscPrinter>
    ) { }


    async findById(id: string): Promise<RscPrinter | null> {
        return this.printerRepository.findOne({ where: { id } });
    }

    async findAll(): Promise<RscPrinter[]> {
        return this.printerRepository.find();
    }

    // Example: find by brand
    async findByBrand(brand: string): Promise<RscPrinter[] | null> {
        return this.printerRepository.find({ where: { brand } });
    }
}
