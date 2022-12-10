import { Router } from "express";
const productRouter = Router();

import { 
    addProduct, 
    deleteProductById, 
    getProductById, 
    getProducts, 
    updateProductById 
} from "../controllers/ProductController";

productRouter.get("/",getProducts);
productRouter.get("/:id",getProductById);
productRouter.post("/",addProduct);
productRouter.put("/:id",updateProductById);
productRouter.delete("/:id",deleteProductById);

export {productRouter};