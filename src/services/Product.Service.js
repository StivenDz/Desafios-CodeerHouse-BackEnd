// import { Autowired } from "../decorators/Autowired.dec.js";
// import { Injectable } from "../decorators/Injectable.dec.js";
import { ProductDTO } from "../models/DTO/Product.DTO.js";
import { ProductRepository } from "../database/Product.Repository.js";

// @Injectable("productService")
export class ProductService{

    // @Autowired("productRepository")
    // productRepository;

   static async getAll(){
        return await ProductRepository.SELECT();
    }
   static async getByProductId(productId) {
        return await ProductRepository.SELECT_ID(productId);
    }
   static async save(product){
        const productEntity = new ProductDTO(product.name, product.description, product.price, product.image).toEntity();
        await ProductRepository.INSERT(productEntity);
        return await ProductRepository.SELECT_ID(productEntity.productId);
    }
   static async updateById(dto, productId) {
        const product = await ProductRepository.SELECT_ID(productId);
        if (!product) return null
        const result = await ProductRepository.UPDATE(dto, productId);
        return result ? await ProductRepository.SELECT_ID(productId) : null;
    }
   static async deleteById(productId) {
        const product = await ProductRepository.SELECT_ID(productId);
        if (!product) return null
        const result = await ProductRepository.DELETE(productId);
        return result ? product : result
    }
}