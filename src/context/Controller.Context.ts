import { ImagesController } from "../controllers/Images.Controller";
import { AuthController } from "../controllers/Auth.Controller";
import { ProductController } from "../controllers/Product.Controller";
import { ShoppingCartController } from "../controllers/ShoppingCart.Controller";
import { OrderController } from "../controllers/Order.Controller";

export const controllers:any = {};

export const loadControllers = () => {
    controllers[`authcontroller`] = new AuthController();
    controllers[`imagescontroller`] = new ImagesController();
    controllers[`productcontroller`] = new ProductController();
    controllers[`shoppingcartcontroller`] = new ShoppingCartController();
    controllers[`ordercontroller`] = new OrderController();
}