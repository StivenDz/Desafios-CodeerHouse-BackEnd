import { ProductCartEntity } from "./ProductCart.Entity";
import {randomUUID} from "crypto"

export class OrderEntity{
    public id?: number;
    public orderId: string;
    public userId: string;
    public created_At?: Date;
    public products: Array<ProductCartEntity>;

    constructor(
        userId: string,
        products: Array<ProductCartEntity>,
    ) {
        this.orderId = randomUUID();
        this.userId = userId;
        this.products = products
    }
}