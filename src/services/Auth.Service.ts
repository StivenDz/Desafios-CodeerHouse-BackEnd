import { UsersRepository } from "../database/Users.Repository";
import { UserEntity } from "../models/Entity/User.Entity";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import { UserDTO } from "../models/DTO/User.DTO";
import { AuthResponse } from "@types";
import { Inject, Injectable } from "../decorators/Injectable.dec";
import { EntityParser } from "../utils/ParseToEntity";

@Injectable("authService")
export class AuthService{

    @Inject("usersRepository")
    public repository!:UsersRepository;

    public async Authenticate(userData:UserDTO):Promise<AuthResponse>{
        const response = await this.getUserByEmail(userData.email);
        if(!response) return {validUser:false,message:"This email doesn't exist"};
        const valid = this.validatePasword(userData.password,response.password);
        return !valid ? {validUser:false,message:"Incorrect Password!"} : {validUser:true,message:"Logged Successfully!",user:response}
    }

    public async getUserByEmail(email:string): Promise<UserEntity | null>{
        const response = await this.repository.SELECT_BY_COLUMN("email",email);
        const user:Array<UserEntity> = EntityParser.ToArrayEntity<UserEntity>(response);
        return !user.length ? null : user[0]
    }

    private  validatePasword(password:string,cPassword:string){
        const response = bcrypt.compareSync(password,cPassword);
        return response
    }

    public async Register(user:UserEntity){
        const response = await this.getUserByEmail(user.email);
        if(response) return false;
        user.userId = randomUUID();
        user.password = bcrypt.hashSync(user.password);
        await this.repository.INSERT(user);
        return true
    }

    public async getUsers():Promise<Array<UserEntity>>{
        const users = await this.repository.SELECT();
        return users;
    }
}