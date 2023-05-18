import { ShoppingCartEntity } from "../Entity/ShoppingCart.Entity.js";

// @DTO
export class ShoppingCartDTO {
    id;
    cartId;
    userId;
    products;
    created_At;

    constructor(
        userId,
        products,
    ) {
        this.userId = userId;
        this.products = products
    }

    toEntity(){
        return new ShoppingCartEntity(
            this.userId,
            this.products
        )
    }
}