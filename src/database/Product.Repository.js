// import { Injectable } from "../decorators/Injectable.dec.js";
// import { Repository } from "../decorators/Repository.dec.js";
// import { ProductEntity } from "../models/Entity/Product.Entity.js";
import { Connections } from "../connections/index.Connections.js";
import { EntityParser } from "../utils/ParseToEntity.js";
import { Query } from "./Queries.js";
import { ProductDTO } from "../models/DTO/Product.DTO.js";
import { Logger } from "../utils/Logger.util.js";
import { __dirname } from "../constants/Dirname.js";
import fs from "fs";
import path from "path";
const DefaultProducts = JSON.parse(fs.readFileSync(path.join(__dirname,"../../defaultProducts.json"),"utf-8"));
console.log(path.join(__dirname,"../../defaultProducts.json"));
// @Repository
// @Injectable("productRepository")
export class ProductRepository{

    static async CHECK_TABLE_EXISTENCE() {
        const [result] = await (Connections.SQLConnection).query(Query.CHECK_TABLE("products"))
        return result
    }
    static async CREATE_TABLE() {
        const [result] = await (Connections.SQLConnection).query("CREATE TABLE products(id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,productId VARCHAR(255) NOT NULL,name VARCHAR(255) NOT NULL,price INTEGER NOT NULL, description TEXT NOT NULL,image VARCHAR(255) NULL,created_At TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)")
        await this.INSERT_DEFAULT_PRODUCTS();
        return result;
    }
    static async SELECT() {
        const [products] = await (Connections.SQLConnection).query(Query.SELECT("products"));
        return EntityParser.ToArrayEntity(products);
    }
   static async SELECT_ID(productId){
        const [product] = await (Connections.SQLConnection).query(...Query.SELECT_BY_COLUMN("products", "productId", productId));
        return EntityParser.ToEntity(product);
    }
    static async INSERT(productEntity) {
        const { productId, name, price, description, image } = productEntity;
        try {
            await (Connections.SQLConnection).query("INSERT INTO products(productId,name,price,description,image) VALUES(?,?,?,?,?)", [productId, name, price, description, image])
            return true
        } catch (ex) {
            Logger.ServerError(ex.message);
            return false;
        }
    }
    static async INSERT_DEFAULT_PRODUCTS() {
        const defaultProducts = JSON.parse(JSON.stringify(DefaultProducts));
        await Promise.all(defaultProducts.map(async (product) => {
            this.INSERT(
                new ProductDTO(
                    product.name,
                    product.description,
                    product.price,
                    product.image
                ).toEntity()
            )
        }))
    }
    static async UPDATE(product, productId) {
        const { name, price, description, image } = product;
        const [result] = await (Connections.SQLConnection).query("UPDATE products SET name = IFNULL(?,name) ,price = IFNULL(?,price), description = IFNULL(?,description), image = IFNULL(?,image) WHERE productId = ?", [name, price, description, image, productId]);
        return JSON.parse(JSON.stringify(result)).affectedRows > 0
    }

    static async DELETE(productId) {
        const [result] = await (Connections.SQLConnection).query("DELETE FROM products WHERE productId = ?", [productId]);
        return JSON.parse(JSON.stringify(result)).affectedRows > 0;
    }
}