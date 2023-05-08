import { Connections } from "../connections/index.Connections";
import { Injectable } from "../decorators/Injectable.dec";
import { Repository } from "../decorators/Repository.dec";
import { IRepository } from "../interfaces/IRepository";
import { ProductEntity } from "../models/Entity/Product.Entity";
import { EntityParser } from "../utils/ParseToEntity";
import { Query } from "./Queries";

@Repository
@Injectable("productRepository")
export class ProductRepository implements IRepository<ProductEntity>{
    private tableName: string = "products";

    public get getTableName(): string {
        return this.tableName;
    }

    public async CHECK_TABLE_EXISTENCE() {
        const [result] = await (Connections.SQLConnection).query(Query.CHECK_TABLE(this.tableName))
        return result
    }
    public async CREATE_TABLE() {
        const [result] = await (Connections.SQLConnection).query("CREATE TABLE products(id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,name VARCHAR(255) NOT NULL,description TEXT NOT NULL,image VARCHAR(255) NULL,created_At TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)")
        return result;
    }
    public async SELECT(): Promise<ProductEntity[]> {
        const [products] = await (Connections.SQLConnection).query(Query.SELECT(this.tableName));
        return EntityParser.ToArrayEntity<ProductEntity>(products);
    }
    public async SELECT_ID(id: number): Promise<ProductEntity> {
        const [product] = await (Connections.SQLConnection).query(...Query.SELECT_BY_COLUMN(this.tableName, "id", id));
        return EntityParser.ToEntity(product);
    }
    INSERT(_entity: ProductEntity): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    UPDATE(_id: number): boolean {
        throw new Error("Method not implemented.");
    }
    DELETE(_id: number): boolean {
        throw new Error("Method not implemented.");
    }
}