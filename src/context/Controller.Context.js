import { ImagesController } from "../controllers/Images.Controller.js";
import { AuthController } from "../controllers/Auth.Controller.js";
import { ProductController } from "../controllers/Product.Controller.js";
import { ShoppingCartController } from "../controllers/ShoppingCart.Controller.js";
import { OrderController } from "../controllers/Order.Controller.js";

export const controllers = {};

export const loadControllers = () => {
    controllers[`authcontroller`] = new AuthController();
    controllers[`imagescontroller`] = new ImagesController();
    controllers[`productcontroller`] = new ProductController();
    controllers[`shoppingcartcontroller`] = new ShoppingCartController();
    controllers[`ordercontroller`] = new OrderController();
}