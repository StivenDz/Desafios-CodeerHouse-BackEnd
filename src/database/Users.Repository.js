// import { Injectable } from "../decorators/Injectable.dec.js";
// import { Repository } from "../decorators/Repository.dec.js";
// import { Autowired } from "../decorators/Autowired.dec.js";
import { Connections } from "../connections/index.Connections.js"
import { Constants } from "../constants/index.contants.js";
import { ShoppingCartEntity } from "../models/Entity/ShoppingCart.Entity.js";
import { UserEntity } from "../models/Entity/User.Entity.js";
import { EntityParser } from "../utils/ParseToEntity.js";
import { ShoppingCartRepository } from "./ShoppingCart.Repository.js";
import { Query } from "./Queries.js";
import bcrypt from "bcryptjs"

// @Repository
// @Injectable("usersRepository")
export class UsersRepository{

    // @Autowired("shoppingCartRepository")
    // shoppingCartRepository;

    static async CHECK_TABLE_EXISTENCE() {
        const [result] = await (Connections.SQLConnection).query(Query.CHECK_TABLE("users"))
        return result
    }
    static async CREATE_TABLE() {
        const [result] = await (Connections.SQLConnection).query("CREATE TABLE users(id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,userId VARCHAR(250) NOT NULL,email VARCHAR(200) NOT NULL,name VARCHAR(155) NOT NULL,lastName VARCHAR(155) NOT NULL,password VARCHAR(255) NOT NULL,image VARCHAR(250) NULL,created_At TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)");
        await this.INSERT_DEFAULT_ADMIN_USER();
        return result;
    }
    static async SELECT() {
        const [result] = await Connections.SQLConnection.query("SELECT id,userId,name,lastName,email,image FROM users");
        return EntityParser.ToArrayEntity(result);
    }
    static async SELECT_ID(userId) {
        const [response] = await Connections.SQLConnection.query(...Query.SELECT_BY_COLUMN("users", "userId", userId));
        return EntityParser.ToEntity(response);
    }
    static async SELECT_BY_COLUMN(column, equalTo) {
        const [response] = await Connections.SQLConnection.query(...Query.SELECT_BY_COLUMN("users", column, equalTo));
        return EntityParser.ToEntity(response);
    }

    static async INSERT(user) {
        const { userId, name, lastName, email, password } = user;
        await Connections.SQLConnection.query("INSERT INTO users(userId,name,lastName,email,password) VALUES(?,?,?,?,?)", [userId, name, lastName, email, password]);
        await ShoppingCartRepository.INSERT(
            new ShoppingCartEntity(
                userId,
                []
            )
        )
        return true;
    }
    static async INSERT_DEFAULT_ADMIN_USER() {
        const user = new UserEntity("Stiven", "Diaz", bcrypt.hashSync("123456789"), Constants.ADMIN || "");
        await this.INSERT(user);
    }
    static async UPDATE(_dto, _id) {
        throw new Error("Method not implemented.");
    }
    static async DELETE(_id) {
        throw new Error("Method not implemented.");
    }
}