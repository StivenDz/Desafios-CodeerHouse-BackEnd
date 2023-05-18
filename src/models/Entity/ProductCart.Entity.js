
// @Entity
export class ProductCartEntity {
    id ;
    productId;
    name;
    description;
    quantitySelected;
    price;
    image;
    created_At;

    constructor(
        productId,
        name,
        description,
        price,
        quantitySelected,
        image
    ) {
        this.productId = productId;
        this.name = name;
        this.description = description;
        this.quantitySelected = quantitySelected;
        this.price = price;
        this.image = image;
    }
}