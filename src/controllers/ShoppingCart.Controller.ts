import { Request, Response } from "express";
import { Controller } from "../decorators/Controller.dec";
import { DELETE, GET, POST } from "../decorators/Http.dec";
import { Inject } from "../decorators/Injectable.dec";
import { ShoppingCartService } from "../services/ShoppingCart.Service";
import { Middleware } from "../decorators/Middleware.dec";
import { JWT } from "../middlewares/JWT.Middleware";
import { JWT as JWT_util } from "../utils/JWT.util";
import { UserEntity } from "../models/Entity/User.Entity";

@Controller("shoppingCartProducts")
export class ShoppingCartController{
    
    @Inject("shoppingCartService")
    private shoppingCartService!:ShoppingCartService;

    @Middleware(JWT.verifyToken)
    @GET()
    public async getShoppingCart(req:Request,res:Response){
        try{
            const user:UserEntity = this.getUser(req);
            const shoppingCart = await this.shoppingCartService.getByUserId(user.userId);
            res.status(200).json(shoppingCart);
        }catch(ex:any){
            res.status(500).json({ error: ex.message });
        }
    }
    @Middleware(JWT.verifyToken)
    @POST("/:productId/:quantitySelected")
    public async addProductToShoppingCart(req:Request,res:Response){
        const {productId,quantitySelected} = req.params;
        try{
            const user:UserEntity = this.getUser(req);
            const response = await this.shoppingCartService.addProductToShoppingCart(productId,user.userId,Number(quantitySelected));
            if(response.error) res.status(400).json({ error: response.error });
            else res.status(201).json({successfully:"product added successfully",...response.cart});
        }catch(ex:any){
            res.status(500).json({ error: ex.message });
        }
    }
    @Middleware(JWT.verifyToken)
    @DELETE(":productId")
    public async deleteProductFromShoppingCart(req:Request,res:Response){
        const {productId} = req.params;
        try{
            const user:UserEntity = this.getUser(req);
            const response = await this.shoppingCartService.deleteProductFromShoppingCart(productId,user.userId);
            if(response.error) res.status(400).json({ error: response.error });
            else res.status(201).json({successfully:"product deleted successfully",...response.cart});
        }catch(ex:any){
            res.status(500).json({ error: ex.message });
        }
    }

    private getUser(req:Request){
        return JWT_util.DecryptToken(JWT.getToken(req))
    }
}