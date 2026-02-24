import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { RscSalesChannel } from './sales-channel.entity';
import { RscShippingProfile } from './shipping-profile.entity';
import { ProductConfigPart } from './product-config-part.entity';

@Entity()
export class ProductConfig {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ default: 'DRAFT' })
    status: string;

    @ManyToOne(() => RscSalesChannel)
    @JoinColumn()
    salesChannel: RscSalesChannel;

    @Column({ nullable: true })
    salesChannelId: string;

    @ManyToOne(() => RscShippingProfile)
    @JoinColumn()
    shippingProfile: RscShippingProfile;

    @Column({ nullable: true })
    shippingProfileId: string;

    @OneToMany(() => ProductConfigPart, (part) => part.productConfig, { cascade: true })
    parts: ProductConfigPart[];

    @Column('decimal', { precision: 10, scale: 2, default: 0 })
    otherCosts: number;

    @Column('decimal', { precision: 10, scale: 2, nullable: true })
    totalCost: number;

    @Column('decimal', { precision: 10, scale: 2, nullable: true })
    finalPrice: number;

    @Column('decimal', { precision: 5, scale: 4, default: 0.20 })
    desiredMargin: number;

    @Column('decimal', { precision: 5, scale: 4, default: 0.20 })
    electricityPrice: number;
}
