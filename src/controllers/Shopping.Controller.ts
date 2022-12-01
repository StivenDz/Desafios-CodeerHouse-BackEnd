import { Request,Response } from "express";

const createNewCart = (_req:Request, _res:Response) => {
//   res.send("Crea un carrito con una lista vacia de productos y asigna un id");
};

const clearCart = (_req:Request, _res:Response) => {
//   res.send("vacia el carrito pero no lo elimina");
};

const addProductToCart = (_req:Request, _res:Response) => {
//   res.send("para enviar productos al carrito, enviando el id en el cuerpo de la petición");
};

const showAllCartProducts = (_req:Request, _res:Response) => {
//   res.send("lista todos los productos guardados en el carrito");
};

const DeleteCartProduct = (_req:Request, _res:Response) => {
//   res.send("elimina un producto específico de un carrito específico.");
};

export {
    createNewCart,
    clearCart,
    addProductToCart,
    showAllCartProducts,
    DeleteCartProduct,
};
