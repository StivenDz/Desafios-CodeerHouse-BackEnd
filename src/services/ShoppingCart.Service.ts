import { ShoppingCartRepository } from "../database/ShoppingCart.Repository";
import { Autowired } from "../decorators/Autowired.dec";
import { Inject, Injectable } from "../decorators/Injectable.dec";
import { IService } from "../interfaces/IService";
import { ProductCartEntity } from "../models/Entity/ProductCart.Entity";
import { ShoppingCartEntity } from "../models/Entity/ShoppingCart.Entity";
import { ProductService } from "./Product.Service";

type Response = {
    cart: ShoppingCartEntity | null;
    error: string | null;
};

@Injectable("shoppingCartService")
export class ShoppingCartService implements IService<ShoppingCartEntity>{

    @Autowired("shoppingCartRepository")
    private shoppingCartRepository!: ShoppingCartRepository;

    @Inject("productService")
    private productService!: ProductService;


    public async getByUserId(userId: string): Promise<ShoppingCartEntity> {
        return await this.shoppingCartRepository.SELECT_BY_USER_ID(userId);
    }
    public async getProductsByUserId(userId: string): Promise<Array<ProductCartEntity>> {
        const shoppingCart = await this.shoppingCartRepository.SELECT_BY_USER_ID(userId);
        const products: Array<ProductCartEntity> = JSON.parse(JSON.stringify(shoppingCart.products));
        return products
    }
    public async addProductToShoppingCart(productId: string, userId: string, quantitySelected: number): Promise<Response> {
        const shoppingCartEntity: ShoppingCartEntity = await this.shoppingCartRepository.SELECT_BY_USER_ID(userId);
        const product = await this.productService.getByProductId(productId);
        if (!product) return { error: `product with id = ${productId} doesn't exist`, cart: null };
        const products: Array<ProductCartEntity> = JSON.parse(JSON.stringify(shoppingCartEntity.products));
        if (products.filter((pro: ProductCartEntity) => product.productId == pro.productId).length) return { error: `this product is already in the cart`, cart: null };
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
        await this.shoppingCartRepository.UPDATE_CART(products, userId);
        return { cart: await this.shoppingCartRepository.SELECT_BY_USER_ID(userId), error: null };
    }
    public async deleteProductFromShoppingCart(productId: string, userId: string): Promise<Response> {
        const shoppingCartEntity: ShoppingCartEntity = await this.shoppingCartRepository.SELECT_BY_USER_ID(userId);
        const product = await this.productService.getByProductId(productId);
        if (!product) return { error: `product with id = ${productId} doesn't exist`, cart: null };
        const products: Array<ProductCartEntity> = JSON.parse(JSON.stringify(shoppingCartEntity.products));
        if (!(products.filter((pro: ProductCartEntity) => product.productId == pro.productId)).length) return { error: `this product is not in the cart`, cart: null };


        await this.shoppingCartRepository.UPDATE_CART(products.filter((pro: ProductCartEntity) => pro.productId != productId), userId);
        return { cart: await this.shoppingCartRepository.SELECT_BY_USER_ID(userId), error: null };
    }
    public async clearCart(userId: string) {
        await this.shoppingCartRepository.UPDATE_CART([], userId);
    }
    public async getAll(): Promise<ShoppingCartEntity[]> {
        throw new Error("Method not implemented.");
    }
    public async save(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    public async updateById(): Promise<ShoppingCartEntity | null> {
        throw new Error("Method not implemented.");
    }
    public async deleteById(_id: string | number): Promise<Boolean | ShoppingCartEntity | null> {
        throw new Error("Method not implemented.");
    }
}