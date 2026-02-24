import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('rsc_printer')
export class RscPrinter {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'brand', type: 'varchar', length: 255 })
  brand: string; // ex: "Bambu Lab, Creality, Prusa"

  @Column({ name: 'model', type: 'varchar', length: 255 })
  model: string; // ex: "X1 Carbon, Ender 3, MK3S+"

  @Column('decimal')
  powerConsumptionWatts: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  acquisitionCost: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0.5 })
  maintenanceHourlyCost: number;
}