import express from 'express';
import { userAuth } from '../middlewares/auth.middleware';
import * as cartController from '../controllers/cart.controller';

const router = express.Router();

//route to get the cart
router.get('/get', userAuth, cartController.getCart);

//route to add product in the cart
router.post('/add/:productId', userAuth, cartController.addProductToCart);

//route to purchase book from the cart

router.put('/edit/:productId', userAuth, cartController.updateProductToCart);

//route to delete product from the cart
router.delete(
  '/delete/:productId',
  userAuth,
  cartController.removeProductFromCart
);

export default router;
