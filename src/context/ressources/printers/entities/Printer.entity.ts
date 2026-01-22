import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';


@Entity()
export class Printer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'brand', type: 'varchar', length: 255 })
  brand: string; // ex: "Bambu Lab, Creality, Prusa"

  @Column({ name: 'model', type: 'varchar', length: 255 })
  model: string; // ex: "X1 Carbon, Ender 3, MK3S+"

  @Column('decimal')
  powerConsumptionWatts: number;

}