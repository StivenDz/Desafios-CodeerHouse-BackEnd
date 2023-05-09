import { Connections } from "../connections/index.Connections";
import { Injectable } from "../decorators/Injectable.dec";
import { Repository } from "../decorators/Repository.dec";
import { IRepository } from "../interfaces/IRepository";
import { ProductCartEntity } from "../models/Entity/ProductCart.Entity";
import { ShoppingCartEntity } from "../models/Entity/ShoppingCart.Entity";
import { EntityParser } from "../utils/ParseToEntity";
import { Query } from "./Queries";

@Repository
@Injectable("shoppingCartRepository")
export class ShoppingCartRepository implements IRepository<ShoppingCartEntity>{
    public tableName:string = "shoppingCarts";

    public get getTableName(): string {
        return this.tableName;
    }
    public async CHECK_TABLE_EXISTENCE(){
        const [result] = await Connections.SQLConnection.query(Query.CHECK_TABLE(this.tableName))
        return result
    }
    public async CREATE_TABLE(){
        return await Connections.SQLConnection.query("CREATE TABLE shoppingCarts (id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL, cartId VARCHAR(200) NOT NULL,userId VARCHAR(200) NOT NULL,products JSON,created_At TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)")
    }
    public async SELECT(): Promise<ShoppingCartEntity[]> {
        throw new Error("Method not implemented.");
    }
    public async SELECT_BY_USER_ID(userId: string | number): Promise<ShoppingCartEntity> {
        const [result] = await Connections.SQLConnection.query(...Query.SELECT_BY_COLUMN(this.tableName,"userId",userId));
        return EntityParser.ToEntity<ShoppingCartEntity>(result)
    }
    public async SELECT_ID(_id: string | number): Promise<ShoppingCartEntity> {
        throw new Error("Method not implemented.");
    }
    public async INSERT(entity: ShoppingCartEntity): Promise<boolean> {
        const { userId, cartId, products} = entity;
        await Connections.SQLConnection.query("INSERT INTO shoppingCarts(userId, cartId, products) VALUES(?,?,?)", [userId, cartId, JSON.stringify(products)]);
        return true;
    }
    public async UPDATE_CART(products: Array<ProductCartEntity>,userId:string): Promise<Boolean> {
        const [result] = await Connections.SQLConnection.query("UPDATE shoppingCarts SET products = ? WHERE userId = ?",[JSON.stringify(products),userId])
        return JSON.parse(JSON.stringify(result)).affectedRows > 0
    }
    public async UPDATE(_dto: any, _id: string | number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    public async DELETE(_id: string | number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}