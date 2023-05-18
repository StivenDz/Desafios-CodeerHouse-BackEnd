import { Connections } from "../connections/index.Connections.js";
// import { Injectable } from "../decorators/Injectable.dec.js";
// import { Repository } from "../decorators/Repository.dec.js";
// import { OrderEntity } from "../models/Entity/Order.Entity.js";
import { EntityParser } from "../utils/ParseToEntity.js";
import { Query } from "./Queries.js";

// @Repository
// @Injectable("orderRepository")
export class OrderRepository{
    static async CHECK_TABLE_EXISTENCE() {
        const [result] = await (Connections.SQLConnection).query(Query.CHECK_TABLE("orders"))
        return result
    }
    static async CREATE_TABLE() {
        return await Connections.SQLConnection.query("CREATE TABLE orders(id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL, orderId VARCHAR(200) NOT NULL,userId VARCHAR(200) NOT NULL,products JSON,created_At TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)");
    }
    static async SELECT() {
        throw new Error("Method not implemented.");
    }
    static async SELECT_ID(orderId) {
        const [result] = await Connections.SQLConnection.query(...Query.SELECT_BY_COLUMN("orders", "orderId", orderId));
        return EntityParser.ToEntity(result)
    }
    static async SELECT_BY_USER_ID(userId){
        const [result] = await Connections.SQLConnection.query(...Query.SELECT_BY_COLUMN("orders", "userId", userId));
        return EntityParser.ToArrayEntity(result)
    }
    static async INSERT(entity) {
        const { userId, orderId, products } = entity;
        await Connections.SQLConnection.query("INSERT INTO orders(userId, orderId, products) VALUES(?,?,?)", [userId, orderId, JSON.stringify(products)]);
        return true;
    }
    static async UPDATE(_dto, _id) {
        throw new Error("Method not implemented.");
    }
    static async DELETE(_id) {
        throw new Error("Method not implemented.");
    }

}