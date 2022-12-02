import { Request,Response } from "express";
import { Products } from "../models/Products.Class";
import { ShoppingCart } from "../models/ShoppingCart.Class";

const getAllCartProductsByCartId = (req:Request, res:Response) => {
    const {id} = req.params;
    const cart = ShoppingCart.getAllCartProductsByCartId(id);
    if(!cart){
        res.status(404);
        res.json({error:`This cartId = ${id} doesn't exist`})
    }else{
        res.status(200),
        res.json(cart);
    }
};
const createNewCart = (_req:Request, res:Response) => {
    const cart = ShoppingCart.createNewCart();
    res.status(201);
    res.json({
        state:"successfully",
        message:"cart created correctly",
        cart
    })
};
const addProductToCart = (req:Request, res:Response) => {
    const {id,productId} = req.params;
    
    const productToAdd = Products.getProductById(productId);
    if(!productToAdd){
        res.status(404);
        res.json({error:`This productId = ${id} doesn't exist`})
    }else{
        const product = ShoppingCart.addProductToCart(id,productToAdd);
        if(!product){
            res.status(404);
            res.json({error:`This cartId = ${id} doesn't exist`})
        }else{
            res.status(201);
            res.json({
                state:"successfully",
                message:`product added to cart with id = ${productId} correctly`,
                product,
                cart:ShoppingCart.getAllCartProductsByCartId(id)
            })
        }
    }
};

const deleteCartById = (req:Request, res:Response) => {
    const {id} = req.params;
    const response = ShoppingCart.deleteCartById(id);
    if(!response){
        res.status(404);
        res.json({error:`This cartId = ${id} doesn't exist`})
    }else{
        res.status(200);
        res.json({
            state:"successfully",
            message:`cart with id = ${id} was deleted correctly`
        })
    }
};

const deleteCartProductById = (req:Request, res:Response) => {
    const {id,productId} = req.params;
    const productToDelete = Products.getProductById(productId);

    if(!productToDelete){
        res.status(404);
        res.json({error:`This productId = ${productId} doesn't exist`})
    }else{
        const response = ShoppingCart.deleteCartProductById(id,productId);
        if(!response){
            res.status(404);
            res.json({error:`This cartId = ${id} doesn't exist`})
        }else{
            res.status(200);
            res.json({
                state:"successfully",
                message:`product with id = ${productId} was deleted correctly in cart with id = ${id}`
            })
        }
    }
};

export {
    createNewCart,
    deleteCartById,
    addProductToCart,
    getAllCartProductsByCartId,
    deleteCartProductById,
};
