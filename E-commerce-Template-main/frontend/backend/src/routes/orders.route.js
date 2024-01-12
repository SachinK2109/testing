import express from 'express';
import * as ordersController from '../controllers/orders.controller';
import { newOrdersValidator } from '../validators/orders.validator';
import { adminAuth, userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/get_all', adminAuth, ordersController.getAllAdminOrders);

//route to get all user orderss
router.get('/get', userAuth, ordersController.getAllOrders);

//route to create a new orders
router.post('/add', userAuth, ordersController.newOrders);

//route to checkout order
router.get('/checkout', userAuth, ordersController.checkoutOrder);

//route to get a single orders by their orders id
router.get('/get/:_id', userAuth, ordersController.getOrders);

//route to update a single orders by their orders id
// router.put('/edit/:_id', userAuth, ordersController.updateOrders);

//route to delete a single orders by their orders id
// router.delete('/delete/:_id', userAuth, ordersController.deleteOrders);

export default router;
