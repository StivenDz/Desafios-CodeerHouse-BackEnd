import { IService } from "../interfaces/IService";
import { ProductEntity } from "../models/Entity/Product.Entity";

export class ProductService implements IService<ProductEntity>{
    getAll(): ProductEntity[] {
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