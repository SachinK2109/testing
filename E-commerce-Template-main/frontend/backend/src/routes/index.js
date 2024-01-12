import express from 'express';
const router = express.Router();

import reviewRoute from './review.route';
import cartRoute from './cart.route';
import adminsRoute from './admins.route';
import ordersRoute from './orders.route';
import productRoute from './product.route';
import userRoute from './user.route';
/**
 * Function contains Application routes
 *
 * @returns router
 */
const routes = () => {
  router.get('/', (req, res) => {
    res.json('Welcome');
  });
  router.use('/users', userRoute);
  router.use('/products', productRoute);
  router.use('/orders', ordersRoute);
  router.use('/admins', adminsRoute);
  router.use('/cart', cartRoute);
  router.use('/review', reviewRoute);
  return router;
};

export default routes;
