import { Request, Response } from "express";
import { Controller } from "../decorators/Controller.dec";
import { POST } from "../decorators/Http.dec";
import { Multer } from "../middlewares/multer.Middleware";
import { Middleware } from "../decorators/Middleware.dec";

@Controller()
export class ImagesController{

    @Middleware(Multer.uploadImage)
    @POST()
    public async upload(_req:Request,res:Response){
        try{
            const path = Multer.getPath;
            if(!path.length){
                res.status(400).json( Multer.getError);
                return;
            }
            res.status(201).json({path});
        }catch(ex:any){
            res.status(400).json({error:ex.message});
        }
    }
}