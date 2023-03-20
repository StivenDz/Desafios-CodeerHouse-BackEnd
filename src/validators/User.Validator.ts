import { Request,Response,NextFunction } from "express";
import Joi from "joi";

export class UserValidator{
    public static async Auth(req:Request,res:Response,next:NextFunction){
        const schema = Joi.object({
            email:Joi.string().required(),
            password:Joi.string().required()
        })
        try{
            await schema.validateAsync(req.body);
            next()
        }catch(err){
            res.status(400);
            res.end()
        }
    }
    public static async SignUp(req:Request,res:Response,next:NextFunction){
        const schema = Joi.object({
            firstName:Joi.string().required(),
            lastName:Joi.string().required(),
            email:Joi.string().required(),
            password:Joi.string().required(),
            birthDay:Joi.string().required(),
            gender:Joi.string().required()
        })
        try{
            await schema.validateAsync(req.body);
            next()
        }catch(err){
            res.status(400);
            res.end()
        }
    }
}