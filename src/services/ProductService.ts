import { ProductTable } from "../database/Product.Table";
import { Product } from "../types";

export class ProductService {
    public static async getAllProducts(){
        return await ProductTable.SELECT();
    }
    public static async getProductById(productId:string):Promise<Product>{
        return await ProductTable.SELECT_ID(productId);
    }
    public static async addNewProduct(product:Product){
        const {productId,title,price,thumbnail,stock} = product;
        return await ProductTable.INSERT(productId,title,price,thumbnail,stock);
    }
    public static async updateProductById(product:Product){
        const {productId,title,price,thumbnail,stock} = product;
        return await ProductTable.UPDATE(productId,title,price,thumbnail,stock);
    }
    public static async deleteProductById(productId:string){
        return await ProductTable.DELETE(productId);
    }
}