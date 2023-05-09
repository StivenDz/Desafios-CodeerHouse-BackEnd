import { Connections } from "../connections/index.Connections";
import { Injectable } from "../decorators/Injectable.dec";
import { Repository } from "../decorators/Repository.dec";
import { IRepository } from "../interfaces/IRepository";
import { OrderEntity } from "../models/Entity/Order.Entity";
import { EntityParser } from "../utils/ParseToEntity";
import { Query } from "./Queries";

@Repository
@Injectable("orderRepository")
export class OrderRepository implements IRepository<OrderEntity>{
    public tableName:string =  "orders";

    get getTableName(): string {
        return this.tableName;
    }
    public async CHECK_TABLE_EXISTENCE() {
        const [result] = await (Connections.SQLConnection).query(Query.CHECK_TABLE(this.tableName))
        return result
    }
    public async CREATE_TABLE() {
        return await Connections.SQLConnection.query("CREATE TABLE orders(id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL, orderId VARCHAR(200) NOT NULL,userId VARCHAR(200) NOT NULL,products JSON,created_At TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)");
    }
    public async SELECT(): Promise<OrderEntity[]> {
        throw new Error("Method not implemented.");
    }
    public async SELECT_ID(_id: string | number): Promise<OrderEntity> {
        throw new Error("Method not implemented.");
    }
    public async SELECT_BY_USER_ID(userId: string): Promise<OrderEntity> {
        const [result] = await Connections.SQLConnection.query(...Query.SELECT_BY_COLUMN(this.tableName,"userId",userId));
        return EntityParser.ToEntity<OrderEntity>(result)
    }
    public async INSERT(entity: OrderEntity): Promise<boolean> {
        const {userId, orderId, products} = entity;
        await Connections.SQLConnection.query("INSERT INTO orders(userId, orderId, products) VALUES(?,?,?)", [userId, orderId, products]);
        return true;
    }
    public async UPDATE(_dto: any, _id: string | number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    public async DELETE(_id: string | number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}