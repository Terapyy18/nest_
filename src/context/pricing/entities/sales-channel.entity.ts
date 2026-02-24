import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('rsc_sales_channel')
export class RscSalesChannel {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column('decimal', { precision: 5, scale: 4, default: 0 })
    commissionPercentage: number;

    @Column('decimal', { precision: 10, scale: 2, default: 0 })
    fixedTransactionFee: number;

    @Column({ default: true })
    feesApplyToShipping: boolean;
}
