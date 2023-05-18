
// @Entity
export class ProductEntity {
    id;
    productId;
    name;
    description;
    price;
    image;
    created_At;

    constructor(
        productId,
        name,
        description,
        price,
        image
    ) {
        this.productId = productId;
        this.name = name;
        this.description = description;
        this.price = price;
        this.image = image;
    }
}