
// @Entity
export class ProductEntity {
    public id?: number;
    public productId: string;
    public name: string;
    public description: string;
    public price: number;
    public image?: string;
    public created_At?: Date;

    constructor(
        productId: string,
        name: string,
        description: string,
        price: number,
        image?: string
    ) {
        this.productId = productId;
        this.name = name;
        this.description = description;
        this.price = price;
        this.image = image;
    }
}