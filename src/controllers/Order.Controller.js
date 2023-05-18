// import { Controller } from "../decorators/Controller.dec.js";
// import { GET, POST } from "../decorators/Http.dec.js";
// import { Inject } from "../decorators/Injectable.dec.js";
// import { Middleware } from "../decorators/Middleware.dec.js";
import { JWT } from "../middlewares/JWT.Middleware.js";
import { JWT as JWT_util } from "../utils/JWT.util.js";
import { OrderService } from "../services/Order.Service.js";

// @Controller("orders")
export class OrderController {

    // @Inject("orderService")
    // orderService;

    // @Middleware(JWT.verifyToken)
    // @GET()
    static async getOrder(req, res) {
        try {
            const user = this.getUser(req);
            const orders = await OrderService.getByUserId(user.userId);
            if (!orders || !orders.length) res.status(200).json({ message: "this user doesn't have orders" });
            else res.status(200).json({ orders });
        } catch (ex) {
            res.status(500).json({ error: ex.message });
        }
    }

    // @Middleware(JWT.verifyToken)
    // @POST()
    static async addOrder(req, res) {
        try {
            const user = this.getUser(req);
            const response = await OrderService.buyCart(user);
            if (response.error) res.status(400).json({ error: response.error });
            else res.status(201).json({ order: response.order });
        } catch (ex) {
            res.status(500).json({ error: ex.message });
        }
    }

    static getUser(req) {
        return JWT_util.DecryptToken(JWT.getToken(req))
    }
}