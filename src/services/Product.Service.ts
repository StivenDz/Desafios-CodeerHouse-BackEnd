import { ProductRepository } from "../database/Product.Repository";
import { Autowired } from "../decorators/Autowired.dec";
import { Injectable } from "../decorators/Injectable.dec";
import { IService } from "../interfaces/IService";
import { ProductEntity } from "../models/Entity/Product.Entity";

@Injectable("productService")
export class ProductService implements IService<ProductEntity>{

    @Autowired("productRepository")
    private productRepository!: ProductRepository;

    async getAll(): Promise<ProductEntity[]> {
        return this.productRepository?.SELECT();
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