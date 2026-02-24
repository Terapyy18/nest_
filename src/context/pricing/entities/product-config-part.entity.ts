import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ProductConfig } from './product-config.entity';
import { RscMaterial } from '../../ressources/materials/entities/material.entity';
import { RscPrinter } from '../../ressources/printers/entities/printer.entity';

@Entity()
export class ProductConfigPart {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ default: 'Part' })
    name: string; // e.g., "Plate 1", "Body"

    @ManyToOne(() => ProductConfig, (config) => config.parts, { onDelete: 'CASCADE' })
    @JoinColumn()
    productConfig: ProductConfig;

    @Column()
    productConfigId: string;

    @ManyToOne(() => RscPrinter)
    @JoinColumn()
    printer: RscPrinter;

    @Column()
    printerId: string;

    @ManyToOne(() => RscMaterial)
    @JoinColumn()
    material: RscMaterial;

    @Column()
    materialId: string;

    @Column('float')
    printTimeHours: number;

    @Column('float')
    weightGrams: number;
}
