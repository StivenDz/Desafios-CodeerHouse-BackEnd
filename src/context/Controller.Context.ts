import { AuthController } from "../controllers/Auth.Controller";
import { ImagesController } from "../controllers/Images.Controller";
 import { ProductsController } from "../controllers/Products.Controller";
import { ShoppingCartController } from "../controllers/ShoppingCart.Controller";

export const controllers:any = {};

export const loadControllers = () => {
    controllers[`authcontroller`] = new AuthController();
    controllers[`imagescontroller`] = new ImagesController();
    controllers[`productscontroller`] = new ProductsController();
    controllers[`shoppingcartcontroller`] = new ShoppingCartController();
}