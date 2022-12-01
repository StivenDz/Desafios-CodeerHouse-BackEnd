import express from "express"
import {router as ShoppingRouter} from "./Shopping.Routes";
import {router as ProductRouter} from "./Product.Routes";
const app = express();

app.use('/api/products', ProductRouter);
app.use('/api/shopping', ShoppingRouter);

export {app}