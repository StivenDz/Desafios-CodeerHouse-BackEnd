import { Router } from "express"
const router = Router();
import {
    createNewCart,
    clearCartById,
    addProductToCart,
    getAllCartProductsByCartId,
    deleteCartProductById,
} from '../controllers/Shopping.Controller';

router.get('/:id/products', getAllCartProductsByCartId)
router.post('/', createNewCart)
router.post('/:id/products/:productId', addProductToCart)
router.delete('/:id', clearCartById)
router.delete('/:id/products/:productId', deleteCartProductById)


export { router }