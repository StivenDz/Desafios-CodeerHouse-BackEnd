// import { Injectable } from "../decorators/Injectable.dec.js";
// import { Repository } from "../decorators/Repository.dec.js";
// import { ShoppingCartEntity } from "../models/Entity/ShoppingCart.Entity.js";
import { Connections } from "../connections/index.Connections.js";
import { EntityParser } from "../utils/ParseToEntity.js";
import { Query } from "./Queries.js";

// @Repository
// @Injectable("shoppingCartRepository")
export class ShoppingCartRepository{
    static async CHECK_TABLE_EXISTENCE() {
        const [result] = await Connections.SQLConnection.query(Query.CHECK_TABLE("shoppingCarts"))
        return result
    }
    static async CREATE_TABLE() {
        return await Connections.SQLConnection.query("CREATE TABLE shoppingCarts (id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL, cartId VARCHAR(200) NOT NULL,userId VARCHAR(200) NOT NULL,products JSON,created_At TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)")
    }
    static async SELECT() {
        throw new Error("Method not implemented.");
    }
    static async SELECT_BY_USER_ID(userId) {
        const [result] = await Connections.SQLConnection.query(...Query.SELECT_BY_COLUMN("shoppingCarts", "userId", userId));
        return EntityParser.ToEntity(result)
    }
    static async SELECT_ID(_id){
        throw new Error("Method not implemented.");
    }
    static async INSERT(entity){
        const { userId, cartId, products } = entity;
        await Connections.SQLConnection.query("INSERT INTO shoppingCarts(userId, cartId, products) VALUES(?,?,?)", [userId, cartId, JSON.stringify(products)]);
        return true;
    }
    static async UPDATE_CART(products, userId) {
        const [result] = await Connections.SQLConnection.query("UPDATE shoppingCarts SET products = ? WHERE userId = ?", [JSON.stringify(products), userId])
        return JSON.parse(JSON.stringify(result)).affectedRows > 0
    }
    static async UPDATE(_dto, _id) {
        throw new Error("Method not implemented.");
    }
    static async DELETE(_id) {
        throw new Error("Method not implemented.");
    }
}