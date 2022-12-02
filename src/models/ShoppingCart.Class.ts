import {Cart,Product} from "@types";
// import { randomUUID } from "crypto";
import { ShoppingCartRepository as db } from "../db/ShoppingCart.Repository";

export class ShoppingCart{
    public static getAllCartProductsByCartId(cartId:string):Cart|null{
        const cart = db.SELECT_ID(cartId);
        return cart;
    }

    public static createNewCart():Cart{
        const cart = db.INSERT();
        return cart;
    }

    public static addProductToCart(cartId:string,newProduct:Product):null|Product{
        const cart = this.getAllCartProductsByCartId(cartId);
        if(!cart) return null
        const product = db.INSERT_PRODUCT(newProduct,cartId);
        return product
    }

    public static deleteCartById(cartId:string){
        const cart = this.getAllCartProductsByCartId(cartId);
        if(!cart) return null
        db.DELETE(cartId);
        return true;
    }

    public static deleteCartProductById(cartId:string,productId:string){
        const cart = this.getAllCartProductsByCartId(cartId);
        if(!cart) return null;
        db.DELETE_PRODUCT(cartId,productId);
        return true;
    }

}