import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Printer } from "./entities/Printer.entity";

@Injectable()
export class PrinterRepository {
    constructor(
        @InjectRepository(Printer)
        private readonly printerRepository: Repository<Printer>
    ) {}


    async findById(id: string): Promise<Printer | null> {
        return this.printerRepository.findOne({ where: { id } });
    }

    async findAll(): Promise<Printer[]> {
        return this.printerRepository.find();
    }

    // Example: find by brand
    async findByBrand(brand: string): Promise<Printer[] | null> {
        return this.printerRepository.find({ where: { brand } });
    }
}
