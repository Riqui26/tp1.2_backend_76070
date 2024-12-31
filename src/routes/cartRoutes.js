import express from 'express';
import { CartController } from '../controllers/cartController.js';
import { validateId } from '../middlewares/validateId.js';

const router = express.Router();
const cartController = new CartController();

// Create a new cart
router.post('/', cartController.createCart.bind(cartController));

// Get products in a cart
router.get('/:cid', validateId, cartController.getCartProducts.bind(cartController));

// Add a product to a cart
router.post('/:cid/product/:pid', validateId, cartController.addProductToCart.bind(cartController));

export default router;