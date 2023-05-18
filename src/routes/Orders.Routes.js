import { Router } from "express";
import { JWT } from "../middlewares/JWT.Middleware.js";
import { OrderController } from "../controllers/Order.Controller.js";

const router = Router();

router.get("/",
    JWT.verifyToken.bind(JWT),
    OrderController.getOrder.bind(OrderController));

router.post("/",
    JWT.verifyToken.bind(JWT),
    OrderController.addOrder.bind(OrderController));

export default router;