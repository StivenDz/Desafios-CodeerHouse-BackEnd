
// @Entity
export class ProductCartEntity {
    public id?: number;
    public productId: string;
    public name: string;
    public description: string;
    public quantitySelected: number;
    public price: number;
    public image?: string;
    public created_At?: Date;

    constructor(
        productId: string,
        name: string,
        description: string,
        price: number,
        quantitySelected: number,
        image?: string
    ) {
        this.productId = productId;
        this.name = name;
        this.description = description;
        this.quantitySelected = quantitySelected;
        this.price = price;
        this.image = image;
    }
}