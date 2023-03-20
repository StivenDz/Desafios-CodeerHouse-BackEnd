import express from "express";
import { AuthRouter } from "./Auth.Routes";

const app = express();

//AuthRoutes
app.use("/api/Auth",AuthRouter);


export {app as routes};