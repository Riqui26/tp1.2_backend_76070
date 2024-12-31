import express from 'express';
import { ProductController } from '../controllers/productController.js';
import { validateId } from '../middlewares/validateId.js';

const router = express.Router();
const productController = new ProductController();

// Routes for products
router.get('/', productController.getAllProducts.bind(productController));
router.get('/:pid', validateId, productController.getProductById.bind(productController));
router.post('/', productController.addProduct.bind(productController));
router.put('/:pid', validateId, productController.updateProduct.bind(productController));
router.delete('/:pid', validateId, productController.deleteProduct.bind(productController));

export default router;