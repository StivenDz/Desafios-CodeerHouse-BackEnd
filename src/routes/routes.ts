import { Router } from "express";
import fs from "fs";
import path from "path";
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
    
    // const data = [{name:"jhon"},{name:"Joe"},{name:"Ander"}];
    // res.render("index",{people:data});
    const products = JSON.parse(fs.readFileSync(path.join(__dirname,"../../products.json"),"utf-8"));
    res.render("index",{products});
});

// product controller
router.get("/api/randomProduct", randomProduct)
router.get("/api/products",getProducts);
router.get("/api/product/:id",getProductById);
router.post("/api/product",addProduct);
router.put("/api/product/:id",updateProductById);
router.delete("/api/product/:id",deleteProductById);

export default router ;