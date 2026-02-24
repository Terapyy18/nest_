import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RscSalesChannel } from '../../pricing/entities/sales-channel.entity';
import { CreateSalesChannelDto, UpdateSalesChannelDto } from '../../pricing/dto/sales-channel.dto';

@Injectable()
export class SalesChannelService {
    constructor(
        @InjectRepository(RscSalesChannel)
        private readonly repository: Repository<RscSalesChannel>,
    ) { }

    async create(dto: CreateSalesChannelDto): Promise<RscSalesChannel> {
        const entity = this.repository.create(dto);
        return this.repository.save(entity);
    }

    async findAll(): Promise<RscSalesChannel[]> {
        return this.repository.find();
    }

    async findOne(id: string): Promise<RscSalesChannel> {
        const entity = await this.repository.findOne({ where: { id } });
        if (!entity) throw new NotFoundException(`SalesChannel with ID ${id} not found`);
        return entity;
    }

    async update(id: string, dto: UpdateSalesChannelDto): Promise<RscSalesChannel> {
        const entity = await this.findOne(id);
        const updated = Object.assign(entity, dto);
        return this.repository.save(updated);
    }

    async remove(id: string): Promise<void> {
        const result = await this.repository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`SalesChannel with ID ${id} not found`);
        }
    }
}
