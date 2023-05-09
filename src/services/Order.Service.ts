import { OrderRepository } from "../database/Order.Repository";
import { Autowired } from "../decorators/Autowired.dec";
import { Inject, Injectable } from "../decorators/Injectable.dec";
import { IService } from "../interfaces/IService";
import { OrderEntity } from "../models/Entity/Order.Entity";
import { ProductCartEntity } from "../models/Entity/ProductCart.Entity";
import { UserEntity } from "../models/Entity/User.Entity";
import { Mailer } from "../utils/Mailer.util";
import { ShoppingCartService } from "./ShoppingCart.Service";

type Response = {
    order: OrderEntity | null;
    error: string | null;
};

@Injectable("orderService")
export class OrderService implements IService<OrderEntity>{

    @Autowired("orderRepository")
    private orderRepository!: OrderRepository;

    @Inject("shoppingCartService")
    private shoppingCartService!: ShoppingCartService;

    public async getAll(): Promise<OrderEntity[]> {
        throw new Error("Method not implemented.");
    }
    public async getByUserId(userId: string): Promise<Array<OrderEntity>> {
        return await this.orderRepository.SELECT_BY_USER_ID(userId);
    }
    public async getByOrderId(orderId: string): Promise<OrderEntity> {
        return await this.orderRepository.SELECT_ID(orderId);
    }
    public async buyCart(user: UserEntity): Promise<Response> {
        const products: Array<ProductCartEntity> = await this.shoppingCartService.getProductsByUserId(user.userId);
        if (!products.length) return { error: "this user doesn't have products in it's cart", order: null };
        const order = await this.save(
            new OrderEntity(
                user.userId,
                products
            )
        );
        await Mailer.NotifyOrder(order, user)
        await this.shoppingCartService.clearCart(user.userId);
        return { error: null, order };
    }
    public async save(entity: OrderEntity): Promise<OrderEntity> {
        await this.orderRepository.INSERT(
            entity
        );
        return await this.getByOrderId(entity.orderId);
    }
    public async updateById(_dto: any, _id: string | number): Promise<OrderEntity | null> {
        throw new Error("Method not implemented.");
    }
    public async deleteById(_id: string | number): Promise<Boolean | OrderEntity | null> {
        throw new Error("Method not implemented.");
    }
}