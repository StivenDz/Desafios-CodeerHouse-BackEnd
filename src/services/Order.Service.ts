import { OrderRepository } from "../database/Order.Repository";
import { Autowired } from "../decorators/Autowired.dec";
import { Injectable } from "../decorators/Injectable.dec";
import { IService } from "../interfaces/IService";
import { OrderEntity } from "../models/Entity/Order.Entity";

@Injectable("orderService")
export class OrderService implements IService<OrderEntity>{
    @Autowired("orderRepository")
    private orderRepository!:OrderRepository;

    public async getAll(): Promise<OrderEntity[]> {
        throw new Error("Method not implemented.");
    }
    public async getByUserId(userId:string): Promise<OrderEntity> {
        return await this.orderRepository.SELECT_BY_USER_ID(userId);
    }
    public async save(_entity: OrderEntity): Promise<void> {
        throw new Error("Method not implemented.");
    }
    public async updateById(_dto: any, _id: string | number): Promise<OrderEntity | null> {
        throw new Error("Method not implemented.");
    }
    public async deleteById(_id: string | number): Promise<Boolean | OrderEntity | null> {
        throw new Error("Method not implemented.");
    }
}