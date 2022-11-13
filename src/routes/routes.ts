import { Router } from "express";
// import db from "../db/db.config";
const router = Router();
import { 
    addProduct, 
    deleteProductById, 
    getProductById, 
    getProducts, 
    randomProduct, 
    updateProductById 
} from "../controllers/ProductController";

router.get("/",async (_req, res) => {
    // const [rows]:any = await db.query("SELECT 1 + 1 as result");
    // console.log(rows[0]);
    
    const data = [{name:"jhon"},{name:"Joe"},{name:"Ander"}];
    res.render("index",{people:data});
});

// product controller
router.get("/api/randomProduct", randomProduct)
router.get("/api/products",getProducts);
router.get("/api/product/:id",getProductById);
router.post("/api/product",addProduct);
router.put("/api/product/:id",updateProductById);
router.delete("/api/product/:id",deleteProductById);

export default router ;