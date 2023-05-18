// import { Autowired } from "../decorators/Autowired.dec.js";
// import { Inject, Injectable } from "../decorators/Injectable.dec.js";
import { ProductCartEntity } from "../models/Entity/ProductCart.Entity.js";
import { ProductService } from "./Product.Service.js";
import { ShoppingCartRepository } from "../database/ShoppingCart.Repository.js";

// @Injectable("shoppingCartService")
export class ShoppingCartService{

    // @Autowired("shoppingCartRepository")
    // shoppingCartRepository;

    // @Inject("productService")
    // productService;


    static async getByUserId(userId) {
        return await ShoppingCartRepository.SELECT_BY_USER_ID(userId);
    }
    static async getProductsByUserId(userId){
        const shoppingCart = await ShoppingCartRepository.SELECT_BY_USER_ID(userId);
        const products = JSON.parse(JSON.stringify(shoppingCart.products));
        return products
    }
    static async addProductToShoppingCart(productId, userId, quantitySelected) {
        const shoppingCartEntity = await ShoppingCartRepository.SELECT_BY_USER_ID(userId);
        const product = await ProductService.getByProductId(productId);
        if (!product) return { error: `product with id = ${productId} doesn't exist`, cart: null };
        const products = JSON.parse(JSON.stringify(shoppingCartEntity.products));
        if (products.filter((pro) => product.productId == pro.productId).length) return { error: `this product is already in the cart`, cart: null };
        products.push(
            new ProductCartEntity(
                product.productId,
                product.name,
                product.description,
                product.price,
                quantitySelected,
                product.image
            )
        );
        await ShoppingCartRepository.UPDATE_CART(products, userId);
        return { cart: await ShoppingCartRepository.SELECT_BY_USER_ID(userId), error: null };
    }
    static async deleteProductFromShoppingCart(productId, userId) {
        const shoppingCartEntity = await ShoppingCartRepository.SELECT_BY_USER_ID(userId);
        const product = await ProductService.getByProductId(productId);
        if (!product) return { error: `product with id = ${productId} doesn't exist`, cart: null };
        const products = JSON.parse(JSON.stringify(shoppingCartEntity.products));
        if (!(products.filter((pro) => product.productId == pro.productId)).length) return { error: `this product is not in the cart`, cart: null };


        await ShoppingCartRepository.UPDATE_CART(products.filter((pro) => pro.productId != productId), userId);
        return { cart: await ShoppingCartRepository.SELECT_BY_USER_ID(userId), error: null };
    }
    static async clearCart(userId) {
        await ShoppingCartRepository.UPDATE_CART([], userId);
    }
    static async getAll(){
        throw new Error("Method not implemented.");
    }
    static async save() {
        throw new Error("Method not implemented.");
    }
    static async updateById() {
        throw new Error("Method not implemented.");
    }
    static async deleteById(_id) {
        throw new Error("Method not implemented.");
    }
}