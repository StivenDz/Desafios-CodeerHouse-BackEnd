import { Product as ProductType } from "@types";
import Product from "../../models/Product";

export class ProductCollection{
    public static async SELECT(){
        return await Product.find({});
    }
    public static async SELECT_ID(productId:string){
        return await Product.find({ productId });
    }

    public static async INSERT(product:ProductType){
        const newProduct = new Product(product);
        return await newProduct.save();
    }

    public static async UPDATE(product:ProductType){
        return await Product.updateOne({productId:product.productId},{$set:{...product}})
    }

    public static async DELETE(productId:string){
        return await Product.deleteOne({productId});
    }
}