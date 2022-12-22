import { NextFunction, Request, Response } from "express";
import { Products } from "../services/FileSystemServices/ProductService";

const isValidProduct = (object:any):boolean =>{
    if(!object?.price || !object?.stock || !object?.title || !object?.thumbnail) return false;
    return true
}

const validateProductObject = (product:any,_req: Request, res: Response,cb:Function) => {
    if(!isValidProduct(product)){
        res.status(406);
        res.json({error:"missing properties"})
    }else{
        cb()
    }
}

const validApiKey = (req: Request, res: Response,next:NextFunction)=>{
    const {api_key} = req.headers;
    if(api_key != process.env.API_KEY){
        res.status(403);
        res.json({error:"invalid api_key"})
    }else{
        next();
    }
}

const getAllProducts = (_req: Request, res: Response) => {
    const products = Products.getAllProducts();
    res.status(200);
    res.json(products);
}

const getProductById = (req: Request, res: Response) => {
    const {id} = req.params;
    const product = Products.getProductById(id);
    
    if(!product){
        res.status(404);
        res.json({error:`this id ${id} doesn't exist`});
    }else{
        res.status(200);
        res.json(product);
    }
}

// Admin Key
const addNewProduct = (req: Request, res: Response) => {
    const product = req.body;
    validateProductObject(product,req,res,()=>{
        const productAdded = Products.addNewProduct(product);
        res.status(201);
        res.json({
            status:"successfully",
            productAdded
        })
    });
}

const updateProductById = (req: Request, res: Response) => {
    const {id} = req.params;
    const product = req.body;
    validateProductObject(product,req,res,()=>{
        const oldProduct = Products.getProductById(id)
        const productUpdated = Products.updateProductById(id,product);
        if(!productUpdated){
            res.status(404);
            res.json({error:`this id ${id} doesn't exist`});
        }else{
            res.status(201);
            res.json({
                status:"successfully",
                oldProduct,
                productUpdated:Products.getProductById(id)
            })
        }
    });
}

const deleteProductById = (req: Request, res: Response) => {
    const {id} = req.params;
    const product = Products.getProductById(id);
    
    if(!product){
        res.status(404);
        res.json({error:`this id ${id} doesn't exist`});
    }else{
        Products.deleteProductById(id);
        res.status(200);
        res.json({
            status:"successfully",
            message:`product whit id = ${id} deleted`,
            productDeleted:product
        });
    }
}

export {
    getAllProducts,
    getProductById,
    addNewProduct,
    updateProductById,
    deleteProductById,
    validApiKey
}