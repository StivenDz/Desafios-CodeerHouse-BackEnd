import {Request,Response,NextFunction} from "express";
import { Constants } from "../constants/index.contants";


export class API_KEY{
    public static Validate(req:Request,res:Response,next:NextFunction) {
        const {api_key} = req.headers;
        if(api_key && api_key === Constants.API_KEY) return next();
        res.status(401).json({
            error:"Invalid API KEY"
        })
    }
}
