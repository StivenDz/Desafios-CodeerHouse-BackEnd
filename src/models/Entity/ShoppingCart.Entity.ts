import { ProductCartEntity } from "./ProductCart.Entity";
import {randomUUID} from "crypto";

// @Entity
export class ShoppingCartEntity {
    public id?: number;
    public cartId: string;
    public userId: string;
    public products: Array<ProductCartEntity> | JSON;
    public created_At?: Date;

    constructor(
        userId: string,
        products: Array<ProductCartEntity> | JSON,
    ) {
        this.cartId = randomUUID();
        this.userId = userId;
        this.products = products
    }
}