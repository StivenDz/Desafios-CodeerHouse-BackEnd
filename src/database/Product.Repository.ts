import { Connections } from "../connections/index.Connections";
import { Injectable } from "../decorators/Injectable.dec";
import { ITable } from "../interfaces/ITable";
import { ProductEntity } from "../models/Entity/Product.Entity";
import { ParseToEntity } from "../utils/ParseToEntity";

@Injectable("productRepository")
export class ProductRepository implements ITable<ProductEntity>{
    private async DB() {
        const db = await Connections.getMySQLConnection();
        return db;
    }
    public async CheckTableExistence(){
        const [result] = await (await this.DB()).query("SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE  TABLE_NAME = 'products' LIMIT 1")
        return result
    }
    public async CREATE_TABLE(){
        return await (await this.DB()).query("CREATE TABLE products(id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,productId VARCHAR(60) NOT NULL,title VARCHAR(255) NOT NULL,price INTEGER NOT NULL,stock INTEGER NOT NULL,thumbnail VARCHAR(255) NOT NULL,created_At TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)")
    }
    async SELECT(): Promise<ProductEntity[]> {
        const [result] = await (await this.DB()).query("SELECT * FROM products");
        return ParseToEntity.ToArrayEntity(result);
    }
    UPDATE(_id: number): boolean {
        throw new Error("Method not implemented.");
    }
    DELETE(_id: number): boolean {
        throw new Error("Method not implemented.");
    }
    INSERT(_entity: ProductEntity): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}