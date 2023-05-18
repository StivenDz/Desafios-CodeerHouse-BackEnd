import { Router } from "express";
import { JWT } from "../middlewares/JWT.Middleware.js";
import { ShoppingCartController } from "../controllers/ShoppingCart.Controller.js";

const router = Router();

router.get("/",
    JWT.verifyToken.bind(JWT),
    ShoppingCartController.getShoppingCart.bind(ShoppingCartController));

router.post("/:productId/:quantitySelected",
    JWT.verifyToken.bind(JWT),
    ShoppingCartController.addProductToShoppingCart.bind(ShoppingCartController));

router.delete("/:productId",
    JWT.verifyToken.bind(JWT),
    ShoppingCartController.deleteProductFromShoppingCart.bind(ShoppingCartController));

export default router;