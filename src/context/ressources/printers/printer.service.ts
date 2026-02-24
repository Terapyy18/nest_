import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RscPrinter } from './entities/printer.entity';
import { CreatePrinterDto } from './types/printer.dto';
export class PrinterService {
	constructor(
		@InjectRepository(RscPrinter)
		private readonly printerRepository: Repository<RscPrinter>,
	) { }

	async findAll(): Promise<RscPrinter[]> {
		return this.printerRepository.find();
	}

	async findById(id: string): Promise<RscPrinter | null> {
		return this.printerRepository.findOne({ where: { id } });
	}

	async create(createDto: CreatePrinterDto): Promise<RscPrinter> {
		// Vérifie s'il existe déjà une imprimante avec le même brand et model
		const existing = await this.printerRepository.findOne({
			where: {
				brand: createDto.brand,
				model: createDto.model,
			},
		});
		if (existing) {
			throw new ConflictException('A printer with the same brand and model already exists');
		}
		const printer = this.printerRepository.create(createDto);
		return this.printerRepository.save(printer);
	}
	async update(id: string, data: Partial<CreatePrinterDto>): Promise<RscPrinter | null> {
		await this.printerRepository.update(id, data);
		return this.findById(id);
	}

	async remove(id: string): Promise<void> {
		await this.printerRepository.delete(id);
	}
}
