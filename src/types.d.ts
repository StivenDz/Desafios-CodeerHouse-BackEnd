type Title = "dz" | "rs";

export interface Product {
    id: string;
    title: Title;
    price: number;
    stock: number;
    thumbnail:string;
}