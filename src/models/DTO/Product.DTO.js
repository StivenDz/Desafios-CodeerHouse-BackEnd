import { ProductEntity } from "../Entity/Product.Entity.js";
import {randomUUID} from "crypto";

// @DTO
export class ProductDTO {
    name;
    description;
    price;
    image;

    constructor(name,
        description,
        price,
        image) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.image = image;
    }

    toEntity(){
        return new ProductEntity(
            randomUUID(),
            this.name,
            this.description,
            this.price,
            this.image
        )
    }
}