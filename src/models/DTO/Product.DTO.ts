export class ProductDTO {
    public productId: string;
    public title: string;
    public price: number;
    public stock: number;
    public thumbnail: string;

    constructor(productId: string,
        title: string,
        price: number,
        stock: number,
        thumbnail: string) {
            this.productId = productId;
            this.title = title;
            this.price = price;
            this.stock = stock;
            this.thumbnail = thumbnail;
    }
}