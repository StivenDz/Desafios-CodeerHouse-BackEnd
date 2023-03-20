import { UsersTable } from "../database/Users.Table";
import { UserEntity } from "../models/Entity/User.Entity";

export class AuthService{
    public static repository:UsersTable = new UsersTable();

    registerUser(){

    }
    verifyUser(){

    }

    public static async getUsers():Promise<Array<UserEntity>>{
        const users = await this.repository.SELECT();
        return users;
    }
}