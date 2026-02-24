import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from 'typeorm';

@Entity('rsc_material')
export class RscMaterial {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  brand: string;  // ex: "Bambu Lab"

  @Column()
  type: string; // ex:  PLA, ABS, PETG

  @Column('decimal')
  price: number; // ex: 19.99

  @Column('int', { default: 1000 })
  weightGrams: number; // ex: 1000g
}