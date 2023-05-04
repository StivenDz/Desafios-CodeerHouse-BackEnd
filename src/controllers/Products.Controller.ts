import { Request, Response } from "express";
// import { Controller } from "../decorators/Controller.dec";
import { GET } from "../decorators/Http.dec";
import { ProductService } from "../services/Product.Service";
import { Inject } from "../decorators/Injectable.dec";

// GET /api/products: devuelve todos los productos
// GET /api/products/{id}: devuelve un producto segun id
// POST /api/products: crea un producto (solo usuarios logueados, con permisos de admin)
// PUT /api/products/{id}: actualiza un producto segun su id (solo usuarios logueados, con permisos de admin)
// DELETE /api/products/{id}: borra un producto segun su id (solo usuarios logueados, con permisos de admin)

// @Controller()

export class ProductsController{

    @Inject("productService") 
    public productService!:ProductService;

    @GET()
    public async getAllProducts(_req:Request,res:Response){
        try{
            const products = await this.productService?.getAll();
            res.status(200).json(products);
        }catch(ex:any){
            res.status(500).json({error:ex.message});
        }
    }
}
