export class Product {
    public id: string;
    public title: string;
    public price: number;
    public stock: number;
    public thumbnail:string;
    constructor(id: string, title: string, price: number, stock: number,thumbnail:string) {
        this.id = id;
        this.title = title;
        this.price = price,
        this.stock = stock,
        this.thumbnail = thumbnail
    }
}