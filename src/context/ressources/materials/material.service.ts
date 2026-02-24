
import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RscMaterial } from './entities/material.entity';
import { CreateMaterialDto } from './types/material.dto';

@Injectable()
export class MaterialService {
  constructor(
    @InjectRepository(RscMaterial)
    private readonly materialRepository: Repository<RscMaterial>
  ) { }

  async create(createMaterialDto: CreateMaterialDto): Promise<RscMaterial> {
    // Vérifie s'il existe déjà un matériel avec le même brand et type
    const existing = await this.materialRepository.findOne({
      where: {
        brand: createMaterialDto.brand,
        type: createMaterialDto.type,
      },
    });
    if (existing) {
      throw new ConflictException('A material with the same brand and type already exists');
    }
    const material = this.materialRepository.create(createMaterialDto);
    return this.materialRepository.save(material);
  }

  async findAll(): Promise<RscMaterial[]> {
    return this.materialRepository.find();
  }

  async findOne(id: string): Promise<RscMaterial | null> {
    return this.materialRepository.findOne({ where: { id } });
  }

  async update(id: string, data: Partial<RscMaterial>): Promise<RscMaterial | null> {
    await this.materialRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.materialRepository.delete(id);
  }
}
