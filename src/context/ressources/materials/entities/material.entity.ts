import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from 'typeorm';

@Entity()
export class Material {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  brand: string;  // ex: "Bambu Lab"

  @Column()
  type: string; // ex:  PLA, ABS, PETG

  @Column('decimal')
  price: number; // ex: 19.99
}