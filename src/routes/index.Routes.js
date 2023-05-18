import express from "express";
import ImagesRouter from "./Images.Routes.js";
import OrderRouter from "./Orders.Routes.js";
import AuthRouter from "./Auth.Routes.js";
import ProductRouter from "./Products.Routes.js";
import ShoppingCartProductsRouter from "./ShoppingCartProducts.Routes.js";

export class IndexRouter {
    static getRoutes() {
        const app = express();
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use("/api/images/",ImagesRouter);
        app.use("/api/orders/",OrderRouter);
        app.use("/api/users/",AuthRouter);
        app.use("/api/products/",ProductRouter);
        app.use("/api/shoppingCartProducts/",ShoppingCartProductsRouter);

        return app;
    }
}