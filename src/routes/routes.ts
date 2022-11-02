import { Router } from "express";
// import db from "../db/db.config";
const router = Router();
import products from "../../products.json";

router.get("/",async (_req, res) => {
    // const [rows]:any = await db.query("SELECT 1 + 1 as result");
    // console.log(rows[0]);
    
    const data = [{name:"jhon"},{name:"Joe"},{name:"Ander"}];
    res.render("index",{people:data});
});

router.get("/products", (_req, res) => {
    res.send(`
    <style>
        *{
            padding:0;
            margin:0;
            box-sizing:border-box
        }
        body{
            background:black
        }
    </style>
    <pre style="color:white">
        ${JSON.stringify(products, null, 2)}
    </pre>`);
})
router.get("/randomProduct", (_req, res) => {
    res.send(`
    <style>
    *{
        padding:0;
        margin:0;
        box-sizing:border-box
    }
    body{
        background:black
    }
    </style>
    <pre style="color:white">
        ${JSON.stringify(
            (products[Math.floor(Math.random() * products.length)]), 
            null, 
            2)
        }
    </pre>` );
})
export default router ;