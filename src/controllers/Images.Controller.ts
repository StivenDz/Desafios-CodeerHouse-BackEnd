import { NextFunction, Request, Response } from "express";
import { Controller } from "../decorators/Controller.dec";
import { POST } from "../decorators/Http.dec";
import { Multer } from "../middlewares/multer.Middleware";

@Controller()
export class ImagesController{

    @POST()
    public async upload(req:Request,res:Response,next:NextFunction){
        try{
            await Multer.uploadImage(req,res,next);
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