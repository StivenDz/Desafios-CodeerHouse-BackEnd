import { ProductRepository } from "../database/Product.Repository";
import { Autowired } from "../decorators/Autowired.dec";
import { Injectable } from "../decorators/Injectable.dec";
import { IService } from "../interfaces/IService";
import { ProductDTO } from "../models/DTO/Product.DTO";
import { ProductEntity } from "../models/Entity/Product.Entity";

@Injectable("productService")
export class ProductService implements IService<ProductEntity>{

    @Autowired("productRepository")
    private productRepository!: ProductRepository;

    public async getAll(): Promise<ProductEntity[]> {
        return await this.productRepository.SELECT();
    }
    public async getByProductId(productId: string): Promise<ProductEntity> {
        return await this.productRepository.SELECT_ID(productId);
    }
    public async save(product: ProductDTO): Promise<ProductEntity> {
        const productEntity: ProductEntity = new ProductDTO(product.name, product.description, product.price, product.image).toEntity();
        await this.productRepository.INSERT(productEntity);
        return await this.productRepository.SELECT_ID(productEntity.productId);
    }
    public async updateById(dto: ProductDTO, productId: string): Promise<ProductEntity | null> {
        const product = await this.productRepository.SELECT_ID(productId);
        if (!product) return null
        const result = await this.productRepository.UPDATE(dto, productId);
        return result ? await this.productRepository.SELECT_ID(productId) : null;
    }
    public async deleteById(productId: string): Promise<Boolean | null | ProductEntity> {
        const product = await this.productRepository.SELECT_ID(productId);
        if (!product) return null
        const result = await this.productRepository.DELETE(productId);
        return result ? product : result
    }
}