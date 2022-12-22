import {Cart,Product} from "@types";

import { ShoppingCartRepository as db } from "../../databases/FileSystem/ShoppingCart.Repository";

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

    public static clearCartById(cartId:string):Cart|null{
        const cart = this.getAllCartProductsByCartId(cartId);
        if(!cart) return null
        return db.DELETE(cartId);
    }

    public static deleteCartProductById(cartId:string,productId:string){
        const cart = this.getAllCartProductsByCartId(cartId);
        if(!cart) return null;
        db.DELETE_PRODUCT(cartId,productId);
        return true;
    }
}