import {randomUUID} from "crypto";

// @Entity
export class ShoppingCartEntity {
    id;
    cartId;
    userId;
    products;
    created_At;

    constructor(
        userId,
        products,
    ) {
        this.cartId = randomUUID();
        this.userId = userId;
        this.products = products
    }
}