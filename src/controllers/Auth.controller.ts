import { Request, Response } from "express";
import { AuthService } from "../services/Auth.Service";

export class AuthController{
    public static validateUser(){

    }
    public static createUser(){
        
    }
    public static async getUsers(_req:Request,res:Response){
        const users = await AuthService.getUsers();
        res.status(200).json(users);
    }
}