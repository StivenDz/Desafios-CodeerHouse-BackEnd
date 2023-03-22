import { QuantitySelected } from "@types";
import { ProductEntity } from "./Product.Entity";

// @Entity
export class ShoppingCartEntity {
    public static id: number;
    public static cartId: string;
    public static userId: string;
    public static products: Array<ProductEntity>;
    public static quantitySelected: Array<QuantitySelected>;
    public static created_At: Date;
}