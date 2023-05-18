// import { Autowired } from "../decorators/Autowired.dec.js";
// import { Inject, Injectable } from "../decorators/Injectable.dec.js";
import { OrderEntity } from "../models/Entity/Order.Entity.js";
import { Mailer } from "../utils/Mailer.util.js";
import { OrderRepository } from "../database/Order.Repository.js";
import { ShoppingCartService } from "./ShoppingCart.Service.js";

// @Injectable("orderService")
export class OrderService{

    // @Autowired("orderRepository")
    // orderRepository;

    // @Inject("shoppingCartService")
    // shoppingCartService;

    static async getAll() {
        throw new Error("Method not implemented.");
    }
    static async getByUserId(userId) {
        return await OrderRepository.SELECT_BY_USER_ID(userId);
    }
    static async getByOrderId(orderId){
        return await OrderRepository.SELECT_ID(orderId);
    }
    static async buyCart(user) {
        const products= await ShoppingCartService.getProductsByUserId(user.userId);
        if (!products.length) return { error: "this user doesn't have products in it's cart", order: null };
        const order = await this.save(
            new OrderEntity(
                user.userId,
                products
            )
        );
        await Mailer.NotifyOrder(order, user)
        await ShoppingCartService.clearCart(user.userId);
        return { error: null, order };
    }
    static async save(entity){
        await OrderRepository.INSERT(
            entity
        );
        return await this.getByOrderId(entity.orderId);
    }
    static async updateById(_dto, _id) {
        throw new Error("Method not implemented.");
    }
    static async deleteById(_id){
        throw new Error("Method not implemented.");
    }
}