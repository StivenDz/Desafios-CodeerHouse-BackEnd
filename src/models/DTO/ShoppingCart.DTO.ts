import { ProductCartEntity } from "../Entity/ProductCart.Entity";
import { ShoppingCartEntity } from "../Entity/ShoppingCart.Entity";

// @DTO
export class ShoppingCartDTO {
    public id?: number;
    public cartId?: string;
    public userId: string;
    public products: Array<ProductCartEntity> | JSON;
    public created_At?: Date;

    constructor(
        userId: string,
        products: Array<ProductCartEntity> | JSON,
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