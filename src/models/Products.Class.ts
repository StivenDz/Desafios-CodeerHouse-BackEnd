import {Product} from "@types";
import { randomUUID } from "crypto";
import { DatabaseManager as db } from "../db/DatabaseManager";

export class Products{
    private static id_AutoIncrement():number{
        const products = db.SELECT();
        
        return (products[products.length - 1].id + 1);
    }

    public static getAllProducts():Array<Product>{
        const products = db.SELECT();
        return products;
    }
    public static getProductById(id:string){
        const product = db.SELECT_ID(id);
        return product;
    }
    public static addNewProduct(product:Product){
        product = {
            ...product,
            id:this.id_AutoIncrement(),
            productId:randomUUID()
        }
        db.INSERT(product);
        const newProduct = this.getProductById(product.productId);
        return newProduct;
    }
    public static updateProductById(id:string,productToUpdate:Product):null|boolean{
        const product = this.getProductById(id);
        if(!product){
            return null
        }
        db.UPDATE(id,productToUpdate);
        return true;
    }
    public static deleteProductById(id:string):boolean | null{
        const product = this.getProductById(id);
        if(!product){
            return null
        }
        db.DELETE(id);
        return true;
    }
}