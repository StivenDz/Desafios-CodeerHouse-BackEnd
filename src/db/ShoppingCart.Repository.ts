import fs from "fs";
import Path from "path";
import { Product, Cart } from "@types";
import { randomUUID } from "crypto";
import { SQLFunctions } from "../functions/SQLFunctions";

export class ShoppingCartRepository {
    private static path: string = Path.join(__dirname, "../../shoppingCarts.json");

    private static writeData(data: string): void {
        try {
            return fs.writeFileSync(this.path, data);
        } catch (err) {
            throw new Error("Error writing the Data");
        }
    }
    public static INSERT(): Cart {
        try {
            const ShoppingCarts = this.SELECT();
            const Cart = {
                id: ShoppingCarts[ShoppingCarts.length - 1].id + 1,
                cartId: randomUUID(),
                created_At: SQLFunctions.formatDate(new Date()),
                products: []
            }
            ShoppingCarts.push(Cart);
            this.writeData(JSON.stringify(ShoppingCarts, null, 2));
            return Cart
        } catch (err) {
            throw new Error("Error adding new Cart")
        }
    }
    public static INSERT_PRODUCT(product: Product, cartId: string): Product {
        try {
            const ShoppingCarts = this.SELECT();
            const ShoppingCartsUpdated = ShoppingCarts.map((cart: Cart) =>
                cart.cartId === cartId ? { ...cart, products: [...cart.products, product] } : cart
            )
            this.writeData(JSON.stringify(ShoppingCartsUpdated, null, 2));
            return product

        } catch (err) {
            throw new Error(`Error adding new product in cart with id: ${cartId}`)
        }
    }
    public static SELECT(): Array<Cart> {
        try {
            return JSON.parse(fs.readFileSync(this.path, "utf-8"));
        } catch (err) {
            throw new Error(`Error reading the file in this route ${this.path}`);
        }
    }
    public static SELECT_ID(cartId: string): Cart | null {
        try {
            const ShoppingCarts = this.SELECT();
            const cart = ShoppingCarts.filter((cart: Cart) => cart.cartId == cartId);

            if (cart.length) return cart[0]
            else return null
        } catch (err) {
            throw new Error(`${err}`)
        }

    }

    public static DELETE(cartId: string) {
        try {
            const ShoppingCarts = this.SELECT();
            const ShoppingCartsUpdated = ShoppingCarts.filter((cart: Cart) => cart.cartId !== cartId)
            this.writeData(JSON.stringify(ShoppingCartsUpdated, null, 2));

        } catch (err) {
            throw new Error(`Error adding new product in cart with id: ${cartId}`)
        }
    }

    public static DELETE_PRODUCT(cartId: string, productId: string) {
        try {
            const ShoppingCarts = this.SELECT();
            const ShoppingCartsUpdated = ShoppingCarts.map((cart: Cart) =>
                cart.cartId === cartId ? { ...cart, products: cart.products.filter((product: Product) => product.productId != productId) } : cart
            )
            this.writeData(JSON.stringify(ShoppingCartsUpdated, null, 2));

        } catch (err) {
            throw new Error(`Error adding new product in cart with id: ${cartId}`)
        }
    }
}