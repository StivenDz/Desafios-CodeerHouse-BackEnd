import { QuantitySelected } from "@types";
import { ProductDTO } from "./Product.DTO";

// @DTO
export class ShoppingCartDTO {
    public static id: number;
    public static cartId: string;
    public static userId:string;
    public static products: Array<ProductDTO>;
    public static quantitySelected: Array<QuantitySelected>;
}