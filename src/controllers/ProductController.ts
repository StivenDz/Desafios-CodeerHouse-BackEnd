import { randomUUID } from "crypto";
import { Request,Response } from "express";
import { ProductService } from "../services/ProductService";
import { Product } from "../types";


const isValidProduct = (object:any):boolean =>{
    if(!object?.price || !object?.stock || !object?.title || !object?.thumbnail) return false;
    return true
}

const getProducts = async (_req: Request, res: Response) => {
    const products = await ProductService.getAllProducts();
    res.json(products)
}
const getProductById = async (req: Request, res: Response) => {
    const {id} = req.params;
    const product:Product = await ProductService.getProductById(id);
    if(!product){
        res.status(404);
        res.json({error:"This id doesn't exists"});
    }
    else res.json(product);
}
const addProduct = async (req: Request, res: Response) => {
    const product:any = req.body;
    if(!isValidProduct(product)){
        res.status(406);
        res.json({error:"missing properties"})
    }else{
        const response = await ProductService.addNewProduct({...product,productId:randomUUID()});
        res.status(201);
        res.json(response);
    }
}
const updateProductById = async (req: Request, res: Response) => {
    const {id} = req.params;
    const productUpdated:any = req.body;
    const product:Product|null = await ProductService.getProductById(id);
    if(!product){
        res.status(404);
        res.json({error:"This id doesn't exists"});
    }
    else if(!isValidProduct(productUpdated)){ 
        res.status(406);
        res.json({error:"missing properties"})
    }
    else{
        await ProductService.updateProductById({...productUpdated,productId:id});
        res.json({updated:true,message:`product with the id = ${id} was updated successfully`});
    }
}
const deleteProductById = async (req: Request, res: Response) => {
    const {id} = req.params;
    const product:Product|null = await ProductService.getProductById(id);
    if(!product){
        res.status(404);
        res.json({error:"This id doesn't exists"});
    }else{
        ProductService.deleteProductById(id);
        res.status(200);
        res.json({deleted:true,message:`product with the id = ${id} was deleted successfully`})
    }
}

export {
    getProducts,
    getProductById,
    addProduct,
    updateProductById,
    deleteProductById
};