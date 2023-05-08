import { Request, Response } from "express";
import { AuthService } from "../services/Auth.Service";
import { Controller } from "../decorators/Controller.dec";
import { ControllerBase } from "../interfaces/IControllerBase";
import { GET, POST } from "../decorators/Http.dec";
import { UserValidator } from "../validators/User.Validator";
import { UserDTO } from "../models/DTO/User.DTO";
import { Inject } from "../decorators/Injectable.dec";
import { JWT as JWT_util } from "../utils/JWT.util";
import { Middleware } from "../decorators/Middleware.dec";
import { JWT } from "../middlewares/JWT.Middleware";

@Controller()
export class AuthController extends ControllerBase{
    prototype = Object.getOwnPropertyNames(AuthController.prototype);

    @Inject("authService")
    public authService!:AuthService;

    @Middleware(UserValidator.SignUp)
    @POST()
    public async SignUp(req:Request,res:Response){
        const user:UserDTO = req.body;
        try{
            const response = await this.authService.Register(new UserDTO(
                user.name,user.lastName,user.password,user.email,user.image
            ).toEntity());
            if(response){
                const userEntity = await this.authService.getUserByEmail(user.email);
                const token = userEntity ? JWT_util.CreateToken(userEntity) : null;
                res.status(201).json({
                    successfully:"user Created",
                    token
                })
            }else{
                res.status(400).json({error:"This email already exist"})
            }
        }catch(ex:any){
            res.status(500).json({error:ex.message})
        }
    }

    @Middleware(JWT.verifyToken)
    @GET()
    public async users(_req:Request,res:Response){
        try{
            const users = await this.authService.getUsers();
            res.status(200).json(users);
        }catch(ex:any){
            res.status(500).json({error:ex.message})
        }
    }
}