import { ProductEntity } from "../Entity/Product.Entity";
import {randomUUID} from "crypto";

// @DTO
export class ProductDTO {
    public name: string;
    public description: string;
    public price: number;
    public image?: string;

    constructor(name: string,
        description: string,
        price: number,
        image?: string) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.image = image;
    }

    public toEntity():ProductEntity{
        return new ProductEntity(
            randomUUID(),
            this.name,
            this.description,
            this.price,
            this.image
        )
    }
}