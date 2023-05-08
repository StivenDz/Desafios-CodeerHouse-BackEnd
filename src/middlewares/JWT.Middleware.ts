import { Request,Response,NextFunction } from "express";
import jwt from "jsonwebtoken";

export class JWT{
    public static verifyToken(req:Request,res:Response,next:NextFunction){
        try{
            const token = req.session.token || req.headers.authorization?.split(" ")[1];
            const authType = req.headers.authorization?.split(" ")[0];

            if(!token) return res.status(401).json({error:"not authenticated"});
            if(authType && authType != "Bearer") return res.status(401).json({error:`authentication method ${authType} is not allowed, use Bearer Token`});

            const result = jwt.verify(token,process.env.PRIVATE_KEY || "");
            console.log(result);
            return next();
        }catch(ex){
            return res.status(403).json({error:"Authentication Error, Invalid token or has expired"});
        }
    }
}