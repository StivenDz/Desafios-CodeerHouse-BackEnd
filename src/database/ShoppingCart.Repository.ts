import { Connections } from "../connections/index.Connections";
import { Injectable } from "../decorators/Injectable.dec";
import { IRepository } from "../interfaces/IRepository";
import { ShoppingCartEntity } from "../models/Entity/ShoppingCart.Entity";

@Injectable("shoppingCartRepository")
export class ShoppingCartRepository implements IRepository<ShoppingCartEntity>{
    private tableName:string = "shoppingCarts";

    public get getTableName(): string {
        return this.tableName;
    }

    CHECK_TABLE_EXISTENCE() {
        throw new Error("Method not implemented.");
    }
    private async DB() {
        const db = await Connections.SQLConnection;
        return db;
    }
    public async CheckTableExistence(){
        const [result] = await (await this.DB()).query("SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE  TABLE_NAME = 'shoppingCarts' LIMIT 1")
        return result
    }
    public async CREATE_TABLE(){
        return await (await this.DB()).query("CREATE TABLE products(id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,productId VARCHAR(60) NOT NULL,title VARCHAR(255) NOT NULL,price INTEGER NOT NULL,stock INTEGER NOT NULL,thumbnail VARCHAR(255) NOT NULL,created_At TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)")
    }
    SELECT(): Promise<ShoppingCartEntity[]> {
        throw new Error("Method not implemented.");
    }
    SELECT_ID(_id: string | number): Promise<ShoppingCartEntity> {
        throw new Error("Method not implemented.");
    }
    UPDATE(_id: number): boolean {
        throw new Error("Method not implemented.");
    }
    DELETE(_id: number): boolean {
        throw new Error("Method not implemented.");
    }
    INSERT(_entity: ShoppingCartEntity): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}