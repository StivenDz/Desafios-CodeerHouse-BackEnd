import { UsersRepository } from "../database/Users.Repository";
import { UserEntity } from "../models/Entity/User.Entity";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import { UserDTO } from "../models/DTO/User.DTO";
import { AuthResponse } from "@types";

export class AuthService{
    public static repository:UsersRepository = new UsersRepository();

    public static async Authenticate(userData:UserDTO):Promise<AuthResponse>{
        const response = await this.getUserByEmail(userData.email);
        if(!response) return {validUser:false,message:"This email doesn't exists"};
        const valid = this.validatePasword(userData.password,response.password);
        return !valid ? {validUser:false,message:"Incorrect Password!"} : {validUser:true,message:"Logged Successfully!",user:response}
    }

    private static async getUserByEmail(email:string){
        const response = await this.repository.SELECT_BY_COLUMN("email",email);
        const user:Array<UserEntity> = JSON.parse(JSON.stringify(response));
        return !user.length ? null : user[0]
    }

    private static  validatePasword(password:string,cPassword:string){
        const response = bcrypt.compareSync(password,cPassword);
        return response
    }

    public static async Register(user:UserEntity){
        const response = await this.getUserByEmail(user.email);
        if(response) return false;
        user.userId = randomUUID();
        await this.repository.INSERT(user);
        return true
    }

    public static async getUsers():Promise<Array<UserEntity>>{
        const users = await this.repository.SELECT();
        return users;
    }
}