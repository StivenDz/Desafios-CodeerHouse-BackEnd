import { Router } from "express"
const router = Router();
import {
    createNewCart,
    clearCart,
    addProductToCart,
    showAllCartProducts,
    DeleteCartProduct,
} from '../controllers/Shopping.Controller';

router.post('/', createNewCart)
router.delete('/:id', clearCart)
router.post('/:id_cart/products', addProductToCart)
router.get('/:id_cart/products', showAllCartProducts)
router.delete('/:id_cart/products/:id_prod', DeleteCartProduct)


export { router }