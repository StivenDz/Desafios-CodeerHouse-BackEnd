import { Connections } from "../connections/index.Connections"
import { Autowired } from "../decorators/Autowired.dec";
import { Injectable } from "../decorators/Injectable.dec";
import { Repository } from "../decorators/Repository.dec";
import { IRepository } from "../interfaces/IRepository";
import { ShoppingCartEntity } from "../models/Entity/ShoppingCart.Entity";
import { UserEntity } from "../models/Entity/User.Entity";
import { EntityParser } from "../utils/ParseToEntity";
import { Query } from "./Queries";
import { ShoppingCartRepository } from "./ShoppingCart.Repository";
import bcrypt from "bcryptjs"

@Repository
@Injectable("usersRepository")
export class UsersRepository implements IRepository<UserEntity>{

    @Autowired("shoppingCartRepository")
    private shoppingCartRepository!:ShoppingCartRepository;

    public tableName: string = "users";
    public get getTableName(): string {
        return this.tableName;
    }

    public async CHECK_TABLE_EXISTENCE() {
        const [result] = await (Connections.SQLConnection).query(Query.CHECK_TABLE(this.tableName))
        return result
    }
    public async CREATE_TABLE() {
        const [result] = await (Connections.SQLConnection).query("CREATE TABLE users(id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,userId VARCHAR(250) NOT NULL,email VARCHAR(200) NOT NULL,name VARCHAR(155) NOT NULL,lastName VARCHAR(155) NOT NULL,password VARCHAR(255) NOT NULL,image VARCHAR(250) NULL,created_At TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)");
        await this.INSERT_DEFAULT_ADMIN_USER();
        return result;
    }
    public async SELECT(): Promise<Array<UserEntity>> {
        const [result] = await Connections.SQLConnection.query("SELECT id,userId,name,lastName,email,image FROM users");
        return EntityParser.ToArrayEntity(result);
    }
    public async SELECT_ID(userId: string): Promise<UserEntity> {
        const [response] = await Connections.SQLConnection.query(...Query.SELECT_BY_COLUMN("users", "userId", userId));
        return EntityParser.ToEntity<UserEntity>(response);
    }
    public async SELECT_BY_COLUMN(column: string, equalTo: string) {
        const [response] = await Connections.SQLConnection.query(...Query.SELECT_BY_COLUMN("users", column, equalTo));
        return EntityParser.ToEntity<UserEntity>(response);
    }

    public async INSERT(user: UserEntity) {
        const { userId, name, lastName, email, password } = user;
        await Connections.SQLConnection.query("INSERT INTO users(userId,name,lastName,email,password) VALUES(?,?,?,?,?)", [userId, name, lastName, email, password]);
        await this.shoppingCartRepository.INSERT(
            new ShoppingCartEntity(
                userId,
                []
            )
        )
        return true;
    }
    private async INSERT_DEFAULT_ADMIN_USER() {
        const user = new UserEntity("Stiven","Diaz",bcrypt.hashSync("123456789"), process.env.ADMIN || "");
        await this.INSERT(user);
    }
    public async UPDATE(_dto: any, _id: string | number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    public async DELETE(_id: string | number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}