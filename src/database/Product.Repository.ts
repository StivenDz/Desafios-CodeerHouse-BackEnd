import { Connections } from "../connections/index.Connections";
import { Injectable } from "../decorators/Injectable.dec";
import { Repository } from "../decorators/Repository.dec";
import { IRepository } from "../interfaces/IRepository";
import { ProductEntity } from "../models/Entity/Product.Entity";
import { EntityParser } from "../utils/ParseToEntity";
import { Query } from "./Queries";
import DefaultProducts from "../../defaultProducts.json";
import { ProductDTO } from "../models/DTO/Product.DTO";
import { Logger } from "../utils/Logger.util";

@Repository
@Injectable("productRepository")
export class ProductRepository implements IRepository<ProductEntity>{
    public tableName: string = "products";

    public get getTableName(): string {
        return this.tableName;
    }

    public async CHECK_TABLE_EXISTENCE() {
        const [result] = await (Connections.SQLConnection).query(Query.CHECK_TABLE(this.tableName))
        return result
    }
    public async CREATE_TABLE() {
        const [result] = await (Connections.SQLConnection).query("CREATE TABLE products(id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,productId VARCHAR(255) NOT NULL,name VARCHAR(255) NOT NULL,price INTEGER NOT NULL, description TEXT NOT NULL,image VARCHAR(255) NULL,created_At TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)")
        await this.INSERT_DEFAULT_PRODUCTS();
        return result;
    }
    public async SELECT(): Promise<ProductEntity[]> {
        const [products] = await (Connections.SQLConnection).query(Query.SELECT(this.tableName));
        return EntityParser.ToArrayEntity<ProductEntity>(products);
    }
    public async SELECT_ID(productId: string): Promise<ProductEntity> {
        const [product] = await (Connections.SQLConnection).query(...Query.SELECT_BY_COLUMN(this.tableName, "productId", productId));
        return EntityParser.ToEntity(product);
    }
    public async INSERT(productEntity: ProductEntity): Promise<boolean> {
        const { productId, name, price, description, image } = productEntity;
        try {
            await (Connections.SQLConnection).query("INSERT INTO products(productId,name,price,description,image) VALUES(?,?,?,?,?)", [productId, name, price, description, image])
            return true
        } catch (ex: any) {
            Logger.ServerError(ex.message);
            return false;
        }
    }
    public async INSERT_DEFAULT_PRODUCTS() {
        const defaultProducts: Array<ProductDTO> = JSON.parse(JSON.stringify(DefaultProducts));
        await Promise.all(defaultProducts.map(async (product: ProductDTO) => {
            this.INSERT(
                new ProductDTO(
                    product.name,
                    product.description,
                    product.price,
                    product.image
                ).toEntity()
            )
        }))
    }
    public async UPDATE(product: ProductDTO, productId: string) {
        const { name, price, description, image } = product;
        const [result] = await (Connections.SQLConnection).query("UPDATE products SET name = IFNULL(?,name) ,price = IFNULL(?,price), description = IFNULL(?,description), image = IFNULL(?,image) WHERE productId = ?", [name, price, description, image, productId]);
        return JSON.parse(JSON.stringify(result)).affectedRows > 0
    }

    public async DELETE(productId: string): Promise<boolean> {
        const [result] = await (Connections.SQLConnection).query("DELETE FROM products WHERE productId = ?", [productId]);
        return JSON.parse(JSON.stringify(result)).affectedRows > 0;
    }
}