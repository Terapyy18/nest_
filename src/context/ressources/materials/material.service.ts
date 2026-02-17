
import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Material } from './entities/material.entity';
import { CreateMaterialDto } from './types/material.dto';

@Injectable()
export class MaterialService {
  constructor(
    @InjectRepository(Material)
    private readonly materialRepository: Repository<Material>
  ) { }

  async create(createMaterialDto: CreateMaterialDto): Promise<Material> {
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

  async findAll(): Promise<Material[]> {
    return this.materialRepository.find();
  }

  async findOne(id: string): Promise<Material | null> {
    return this.materialRepository.findOne({ where: { id } });
  }

  async update(id: string, data: Partial<Material>): Promise<Material | null> {
    await this.materialRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.materialRepository.delete(id);
  }
}
