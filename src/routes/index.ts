import express from "express";
import {productRouter} from "./Product.Routes";
import { chatRouter } from "./Chat.Routes";
import path from "path";

const app = express();
app.set("views",path.join(__dirname,"../views/"));

app.use("/api/products",productRouter);
app.use(chatRouter)

export {app}