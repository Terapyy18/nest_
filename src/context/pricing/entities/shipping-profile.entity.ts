import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('rsc_shipping_profile')
export class RscShippingProfile {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column('decimal', { precision: 10, scale: 2 })
    carrierCost: number;

    @Column('decimal', { precision: 10, scale: 2, default: 0 })
    packagingCost: number;
}
