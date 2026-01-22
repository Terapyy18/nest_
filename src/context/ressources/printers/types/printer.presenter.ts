import { Expose, Type } from 'class-transformer';

export class PrinterPresenter {
    @Expose()
    id: string;

    @Expose()
    brand: string;

    @Expose()
    model: string;

    @Expose()
    powerConsumptionWatts: number;
}