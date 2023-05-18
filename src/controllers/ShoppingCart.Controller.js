// import { Controller } from "../decorators/Controller.dec.js";
// import { DELETE, GET, POST } from "../decorators/Http.dec.js";
// import { Inject } from "../decorators/Injectable.dec.js";
// import { Middleware } from "../decorators/Middleware.dec.js";
import { JWT } from "../middlewares/JWT.Middleware.js";
import { JWT as JWT_util } from "../utils/JWT.util.js";
import { ShoppingCartService } from "../services/ShoppingCart.Service.js";

// @Controller("shoppingCartProducts")
export class ShoppingCartController {

    // @Inject("shoppingCartService")
    // shoppingCartService;

    // @Middleware(JWT.verifyToken)
    // @GET()
    static async getShoppingCart(req, res) {
        try {
            const user = this.getUser(req);
            const shoppingCart = await ShoppingCartService.getByUserId(user.userId);
            res.status(200).json(shoppingCart);
        } catch (ex) {
            res.status(500).json({ error: ex.message });
        }
    }
    // @Middleware(JWT.verifyToken)
    // @POST("/:productId/:quantitySelected")
    static async addProductToShoppingCart(req, res) {
        const { productId, quantitySelected } = req.params;
        try {
            const user = this.getUser(req);
            const response = await ShoppingCartService.addProductToShoppingCart(productId, user.userId, Number(quantitySelected));
            if (response.error) res.status(400).json({ error: response.error });
            else res.status(201).json({ successfully: "product added successfully", ...response.cart });
        } catch (ex) {
            res.status(500).json({ error: ex.message });
        }
    }
    // @Middleware(JWT.verifyToken)
    // @DELETE(":productId")
    static async deleteProductFromShoppingCart(req, res) {
        const { productId } = req.params;
        try {
            const user = this.getUser(req);
            const response = await ShoppingCartService.deleteProductFromShoppingCart(productId, user.userId);
            if (response.error) res.status(400).json({ error: response.error });
            else res.status(201).json({ successfully: "product deleted successfully", ...response.cart });
        } catch (ex) {
            res.status(500).json({ error: ex.message });
        }
    }

    static getUser(req) {
        return JWT_util.DecryptToken(JWT.getToken(req))
    }
}