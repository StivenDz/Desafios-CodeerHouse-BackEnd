import { Router } from "express";
import { ProductValidator } from "../validators/Product.Validator.js";
import { ProductController } from "../controllers/Product.Controller.js";
import { JWT } from "../middlewares/JWT.Middleware.js";

const router = Router();

router.get("/", 
    ProductController.getAllProducts.bind(ProductController));

router.get("/:productId", 
    ProductController.getByProductId.bind(ProductController));

router.post("/", 
    JWT.verifyToken.bind(JWT),
    JWT.isAdmin.bind(JWT),
    ProductValidator.Creation.bind(ProductValidator), 
    ProductController.createProduct.bind(ProductController));

router.put("/:productId",
    JWT.verifyToken.bind(JWT),
    JWT.isAdmin.bind(JWT),
    ProductValidator.Update.bind(ProductValidator),
    ProductController.updateProduct.bind(ProductController));

router.delete("/:productId",
    JWT.verifyToken.bind(JWT),
    JWT.isAdmin.bind(JWT),
    ProductController.deleteProduct.bind(ProductController));

export default router