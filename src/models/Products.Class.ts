import {Product} from "@types";
import { ProductRepository as db } from "../db/Product.Repository";

export class Products{
    public static getAllProducts():Array<Product>{
        const products = db.SELECT();
        return products;
    }
    public static getProductById(id:string){
        const product = db.SELECT_ID(id);
        return product;
    }
    public static addNewProduct(product:Product){
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