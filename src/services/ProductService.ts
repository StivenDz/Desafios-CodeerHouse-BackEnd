import { ProductTable } from "../database/Product.Table";
import { Product } from "../types";

export class ProductService {
    private static async validateTable(){
        const result = await JSON.parse(JSON.stringify(await ProductTable.CheckTableExistence()));
        if(!result.length){
            await ProductTable.CREATE_TABLE();
        }
    }
    public static async getAllProducts(){
        await this.validateTable();
        return await ProductTable.SELECT();
    }
    public static async getProductById(productId:string):Promise<Product>{
        await this.validateTable();
        return await ProductTable.SELECT_ID(productId);
    }
    public static async addNewProduct(product:Product){
        await this.validateTable();
        const {productId,title,price,thumbnail,stock} = product;
        return await ProductTable.INSERT(productId,title,price,thumbnail,stock);
    }
    public static async updateProductById(product:Product){
        await this.validateTable();
        const {productId,title,price,thumbnail,stock} = product;
        return await ProductTable.UPDATE(productId,title,price,thumbnail,stock);
    }
    public static async deleteProductById(productId:string){
        await this.validateTable();
        return await ProductTable.DELETE(productId);
    }
}