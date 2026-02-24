import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RscShippingProfile } from '../../pricing/entities/shipping-profile.entity';
import { CreateShippingProfileDto, UpdateShippingProfileDto } from '../../pricing/dto/shipping-profile.dto';

@Injectable()
export class ShippingProfileService {
    constructor(
        @InjectRepository(RscShippingProfile)
        private readonly repository: Repository<RscShippingProfile>,
    ) { }

    async create(dto: CreateShippingProfileDto): Promise<RscShippingProfile> {
        const entity = this.repository.create(dto);
        return this.repository.save(entity);
    }

    async findAll(): Promise<RscShippingProfile[]> {
        return this.repository.find();
    }

    async findOne(id: string): Promise<RscShippingProfile> {
        const entity = await this.repository.findOne({ where: { id } });
        if (!entity) throw new NotFoundException(`ShippingProfile with ID ${id} not found`);
        return entity;
    }

    async update(id: string, dto: UpdateShippingProfileDto): Promise<RscShippingProfile> {
        const entity = await this.findOne(id);
        const updated = Object.assign(entity, dto);
        return this.repository.save(updated);
    }

    async remove(id: string): Promise<void> {
        const result = await this.repository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`ShippingProfile with ID ${id} not found`);
        }
    }
}
