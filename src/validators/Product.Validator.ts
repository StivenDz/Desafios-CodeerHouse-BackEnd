import { Request,Response,NextFunction } from "express";
import Joi from "joi";

export class ProductValidator{
    public static async Creation(req:Request,res:Response,next:NextFunction){
        const schema = Joi.object({
            name:Joi.string().required(),
            price:Joi.number().required(),
            description:Joi.string().required()
        })
        try{
            await schema.validateAsync(req.body);
            next()
        }catch(err){
            res.status(400).json({
                error:"Invalid Product schema",
                received:req.body,
                expected:schema.describe() 
            });
        }
    }
    public static async Update(req:Request,res:Response,next:NextFunction){
        const schema = Joi.object({
            name:Joi.string(),
            price:Joi.number(),
            description:Joi.string()
        }).min(1)
        try{
            await schema.validateAsync(req.body);
            next()
        }catch(err){
            res.status(400).json({
                error:"Invalid Product schema",
                received:req.body,
                expected:schema.describe() 
            });
        }
    }
}