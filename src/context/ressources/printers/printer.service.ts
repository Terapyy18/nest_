import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Printer } from './entities/Printer.entity';
import { CreatePrinterDto } from './types/printer.dto';
export class PrinterService {
	constructor(
		@InjectRepository(Printer)
		private readonly printerRepository: Repository<Printer>,
	) { }

	async findAll(): Promise<Printer[]> {
		return this.printerRepository.find();
	}

	async findById(id: string): Promise<Printer | null> {
		return this.printerRepository.findOne({ where: { id } });
	}

	async create(createDto: CreatePrinterDto): Promise<Printer> {
		const printer = this.printerRepository.create(createDto);
		return this.printerRepository.save(printer);
	}
}
