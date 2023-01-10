export interface Product {
    id?: number,
    title: string,
    price: number,
    thumbnail: string,
    description?: string,
    stock:number,
    productId:string,
    created_At?:string
};

export interface Cart {
    id:number,
    cartId:string,
    products:Array<Product>,
    created_At:string
}

export interface ProductSelected extends Product {
    quantitySelected:number,
    productCreation:string
}

export interface ShoppingCart {
    cartId:string,
    cartCreation:string,
    products:Array<Product>
}