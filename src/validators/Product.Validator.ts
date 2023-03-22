import { Request,Response,NextFunction } from "express";
import Joi from "joi";

export class ProductValidator{
    public static async Validate(req:Request,res:Response,next:NextFunction){
        const schema = Joi.object({
            productId:Joi.string().required(),
            title:Joi.string().required(),
            price:Joi.number().required(),
            stock:Joi.number().required(),
            thumbnail:Joi.string().required()
        })
        try{
            await schema.validateAsync(req.body);
            next()
        }catch(err){
            res.status(400).json({
                error:"Invalid Product schema",
                received:req.body,
                expected:schema
            });
        }
    }
}