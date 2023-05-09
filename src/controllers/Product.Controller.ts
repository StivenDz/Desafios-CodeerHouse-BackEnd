import { Request, Response } from "express";
import { Controller } from "../decorators/Controller.dec";
import { GET, POST, PUT, DELETE } from "../decorators/Http.dec";
import { ProductService } from "../services/Product.Service";
import { Inject } from "../decorators/Injectable.dec";
import { ProductEntity } from "../models/Entity/Product.Entity";
import { Middleware } from "../decorators/Middleware.dec";
import { ProductValidator } from "../validators/Product.Validator";
import { ProductDTO } from "../models/DTO/Product.DTO";
import { JWT } from "../middlewares/JWT.Middleware";


@Controller("products")
export class ProductController {

    @Inject("productService")
    private productService!: ProductService;

    @GET()
    public async getAllProducts(_req: Request, res: Response) {
        try {
            const products: Array<ProductEntity> = await this.productService.getAll();
            res.status(200).json(products);
        } catch (ex: any) {
            res.status(500).json({ error: ex.message });
        }
    }

    @GET(":productId")
    public async getByProductId(req: Request, res: Response) {
        const { productId } = req.params;
        try {
            const product: ProductEntity | null = await this.productService.getByProductId(productId);
            if (product) res.status(200).json(product);
            else res.status(400).json({ error: `productId = ${productId} doesn't exist!` })
        } catch (ex: any) {
            res.status(500).json({ error: ex.message });
        }
    }

    @Middleware(ProductValidator.Creation)
    @Middleware(JWT.isAdmin)
    @Middleware(JWT.verifyToken)
    @POST()
    public async createProduct(req: Request, res: Response) {
        const product: ProductDTO = req.body;
        try {
            const productEntity = await this.productService.save(product);
            res.status(201).json({ successfully: "product created", product: productEntity });
        } catch (ex: any) {
            res.status(500).json({ error: ex.message });
        }
    }

    @Middleware(ProductValidator.Update)
    @Middleware(JWT.isAdmin)
    @Middleware(JWT.verifyToken)
    @PUT(":productId")
    public async updateProduct(req: Request, res: Response) {
        const product: ProductDTO = req.body;
        const { productId } = req.params;
        try {
            const response = await this.productService.updateById(product, productId);
            if (!response) res.status(400).json({ error: "Could not update that product, because this productId doesn't exist" });
            else res.status(200).json({ successfully: "product updated", product: response })
        } catch (ex: any) {
            res.status(500).json({ error: ex.message });
        }
    }

    @Middleware(JWT.isAdmin)
    @Middleware(JWT.verifyToken)
    @DELETE(":productId")
    public async deleteProduct(req: Request, res: Response) {
        const { productId } = req.params;
        try {
            const result = await this.productService.deleteById(productId);
            if (result == null) res.status(400).json({ error: "Could not delete that product, because this productId doesn't exist" });
            else if (result) res.status(200).json({ successfully: "product deleted", product: result })
            else res.status(400).json({ error: "Could not delete that product, an error hahs ocurred" });
        } catch (ex: any) {
            res.status(500).json({ error: ex.message });
        }
    }
}
