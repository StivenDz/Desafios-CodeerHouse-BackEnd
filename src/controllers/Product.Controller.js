// import { Controller } from "../decorators/Controller.dec.js";
// import { GET, POST, PUT, DELETE } from "../decorators/Http.dec.js";
// import { Inject } from "../decorators/Injectable.dec.js";
// import { Middleware } from "../decorators/Middleware.dec.js";
// import { ProductValidator } from "../validators/Product.Validator.js";
// import { JWT } from "../middlewares/JWT.Middleware.js";
import { ProductService } from "../services/Product.Service.js";

// @Controller("products")
export class ProductController {

    // @Inject("productService")
    // productService;

    // @GET()
    static async getAllProducts(_req, res) {
        try {
            const products = await ProductService.getAll();
            res.status(200).json(products);
        } catch (ex) {
            res.status(500).json({ error: ex.message });
        }
    }

    // @GET(":productId")
    static async getByProductId(req, res) {
        const { productId } = req.params;
        try {
            const product = await ProductService.getByProductId(productId);
            if (product) res.status(200).json(product);
            else res.status(400).json({ error: `productId = ${productId} doesn't exist!` })
        } catch (ex) {
            res.status(500).json({ error: ex.message });
        }
    }

    // @Middleware(ProductValidator.Creation)
    // @Middleware(JWT.isAdmin)
    // @Middleware(JWT.verifyToken)
    // @POST()
    static async createProduct(req, res) {
        const product = req.body;
        try {
            const productEntity = await ProductService.save(product);
            res.status(201).json({ successfully: "product created", product: productEntity });
        } catch (ex) {
            res.status(500).json({ error: ex.message });
        }
    }

    // @Middleware(ProductValidator.Update)
    // @Middleware(JWT.isAdmin)
    // @Middleware(JWT.verifyToken)
    // @PUT(":productId")
    static async updateProduct(req, res) {
        const product = req.body;
        const { productId } = req.params;
        try {
            const response = await ProductService.updateById(product, productId);
            if (!response) res.status(400).json({ error: "Could not update that product, because this productId doesn't exist" });
            else res.status(200).json({ successfully: "product updated", product: response })
        } catch (ex) {
            res.status(500).json({ error: ex.message });
        }
    }

    // @Middleware(JWT.isAdmin)
    // @Middleware(JWT.verifyToken)
    // @DELETE(":productId")
    static async deleteProduct(req, res) {
        const { productId } = req.params;
        try {
            const result = await ProductService.deleteById(productId);
            if (result == null) res.status(400).json({ error: "Could not delete that product, because this productId doesn't exist" });
            else if (result) res.status(200).json({ successfully: "product deleted", product: result })
            else res.status(400).json({ error: "Could not delete that product, an error hahs ocurred" });
        } catch (ex) {
            res.status(500).json({ error: ex.message });
        }
    }
}
