import { Router } from "express"
const router = Router();
import {
    getAllProducts,
    getProductById,
    addNewProduct,
    updateProductById,
    deleteProductById,
    validApiKey
} from '../controllers/Product.Controller';

router.get('/', getAllProducts)
router.get('/:id', getProductById)

router.post('/',validApiKey, addNewProduct)
router.put('/:id',validApiKey, updateProductById)
router.delete('/:id',validApiKey, deleteProductById)

export {router}