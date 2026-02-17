import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
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
	async update(id: string, data: Partial<CreatePrinterDto>): Promise<Printer | null> {
		await this.printerRepository.update(id, data);
		return this.findById(id);
	}

	async remove(id: string): Promise<void> {
		await this.printerRepository.delete(id);
	}
}
