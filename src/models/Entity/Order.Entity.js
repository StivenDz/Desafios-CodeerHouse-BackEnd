import {randomUUID} from "crypto"

export class OrderEntity{
    id;
    orderId;
    userId;
    created_At;
    products;

    constructor(
        userId,
        products,
    ) {
        this.orderId = randomUUID();
        this.userId = userId;
        this.products = products
    }
}