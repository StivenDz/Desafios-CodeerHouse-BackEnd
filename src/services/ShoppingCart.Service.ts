import { IService } from "../interfaces/IService";
import { ShoppingCartEntity } from "../models/Entity/ShoppingCart.Entity";

export class ShoppingCartService implements IService<ShoppingCartEntity>{
    getAll(): Promise<ShoppingCartEntity[]> {
        throw new Error("Method not implemented.");
    }
    save(): void {
        throw new Error("Method not implemented.");
    }
    updateById(): void {
        throw new Error("Method not implemented.");
    }
    deleteById(): void {
        throw new Error("Method not implemented.");
    }
}