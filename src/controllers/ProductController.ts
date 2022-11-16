import { Request,Response } from "express";
import { User } from "../models/User";
import { Product } from "../models/Product";

// import db from "../db/db.config";
// import { randomUUID } from "crypto";

const user = new User("Stiven","Diaz",19,null);
// db.query("INSERT INTO users(userId,userName,lastName,email,address,phone) VALUES(?,?,?,?,?,?)",
// [
//     randomUUID(),
//     "Stiven",
//     "Diaz",
//     "stivendiazh@gmail.com",
//     "calle 8 #15-14 Gaira",
//     "+57 3003779033"
// ]
// );


const isValidProduct = (object:any):boolean =>{
    if(!object?.price || !object?.stock || !object?.title || !object?.thumbnail) return false;
    return true
}

const randomProduct = (_req:Request,res:Response) => {

    const products:Array<Product> = user.getProducts();
    const object:Product = (products[Math.floor(Math.random() * products.length)]);
    res.send(user.toProduct(object));
}

const getProducts = (_req: Request, res: Response) => {
    const products:Array<Product> = user.getProducts().map(product => user.toProduct(product));
    res.send(products);
}
const getProductById = (req: Request, res: Response) => {
    const {id} = req.params;
    const product:Product|null = user.getProductById(id);
    if(!product){
        res.status(404);
        res.json({error:"This id doesn't exist"});
    }
    else res.json(user.toProduct(product));

}
const addProduct = (req: Request, res: Response) => {
    const product:any = req.body;
    if(!isValidProduct(product)){
        res.status(406);
        res.json({error:"missing properties"})
    }else{
        const {title,price,stock,thumbnail} = product;
        res.status(201);
        res.json(user.addNewproduct(title,price,stock,thumbnail));
    }
}
const updateProductById = (req: Request, res: Response) => {
    const {id} = req.params;
    const productUpdated:any = req.body;
    const product:Product|null = user.getProductById(id);
    if(!product){
        res.status(404);
        res.json({error:"This id doesn't exist"});
    }
    else if(!isValidProduct(productUpdated)){ 
        res.status(406);
        res.json({error:"missing properties"})
    }
    else{
        user.updateProductById(id,{id,...productUpdated});
        res.json({updated:true,message:`product with the id = ${id} was updated successfully`});
    }
}
const deleteProductById = (req: Request, res: Response) => {
    const {id} = req.params;
    const product:Product|null = user.getProductById(id);
    if(!product){
        res.status(404);
        res.json({error:"This id doesn't exist"});
    }else{
        user.deleteProductById(id);
        res.status(200);
        res.json({deleted:true,message:`product with the id = ${id} was deleted successfully`})
    }
}

export {
    getProducts,
    getProductById,
    addProduct,
    updateProductById,
    deleteProductById,
    randomProduct
};