import { Expose } from 'class-transformer';

export class MaterialPresenter {
    @Expose()
    id: string;

    @Expose()
    brand: string;

    @Expose()
    type: string;

    @Expose()
    price: number;
}