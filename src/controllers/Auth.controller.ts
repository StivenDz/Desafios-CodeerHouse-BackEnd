import { Request, Response } from "express";
import { AuthService } from "../services/Auth.Service";
import { Controller } from "../decorators/Controller.dec";
import { ControllerBase } from "../interfaces/IControllerBase";
import { GET } from "../decorators/Http.dec";

@Controller()
export class AuthController extends ControllerBase{
    prototype = Object.getOwnPropertyNames(AuthController.prototype);

    public  validateUser(){

    }
    public  createUser(){
        
    }

    @GET()
    public async getUsers(_req:Request,res:Response){
        try{
            const users = await AuthService.getUsers();
            res.status(200).json(users);
        }catch(ex:any){
            res.status(500).json({error:ex.message})
        }
    }
}