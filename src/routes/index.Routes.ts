import express from "express";
import { AuthRouter } from "./Auth.Routes";
import { ProductRouter } from "./Product.Routes";
import { ShoppingCartRouter } from "./ShoppingCart.Routes";

const app = express();

//AuthRouter
app.use("/api/Auth",AuthRouter);
//ProductRouter
app.use("/api/product",ProductRouter);
//ShoppingCartRouter
app.use("/api/product",ShoppingCartRouter);


export {app as routes};