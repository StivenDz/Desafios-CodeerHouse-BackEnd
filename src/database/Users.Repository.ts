import {Connections} from "../connections/index.Connections"
import { ITable } from "../interfaces/ITable";
import { UserEntity } from "../models/Entity/User.Entity";
import { ParseToEntity } from "../utils/ParseToEntity";
import { Query } from "./Queries";

export class UsersRepository  implements ITable<UserEntity>{
    UPDATE(_id: number): boolean {
        throw new Error("Method not implemented.");
    }
    DELETE(_id: number): boolean {
        throw new Error("Method not implemented.");
    }
    private async DB(){
        const db = await Connections.getMySQLConnection();
        return db;
    }
    public async SELECT(): Promise<Array<UserEntity>> {
        const [result] = await (await this.DB())?.query("SELECT id,userId,firstName,lastName,email,address,phone,gender,birthDay,profileImage,profileImagePath FROM users");
        return ParseToEntity.ToArrayEntity(result);
    }
    public  async SELECT_ID(userId:string){
        const [response] = await (await this.DB())?.query(...Query.SELECT_BY_COLUMN("users","userId",userId));
        return response;
    }
    public  async SELECT_BY_COLUMN(column:string,equalTo:string){
        const [response] = await (await this.DB())?.query(...Query.SELECT_BY_COLUMN("users",column,equalTo));
        return response;
    }

    public async INSERT(user:UserEntity){
        const {userId,firstName,lastName,email,password,birthDay,gender} = user;
        await (await this.DB())?.query("INSERT INTO users(userId,firstName,lastName,email,password,birthDay,gender) VALUES(?,?,?,?,?,?,?)",[userId,firstName,lastName,email,password,birthDay,gender]);
        return true;
    }
}