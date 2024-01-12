import express from 'express';
import * as productController from '../controllers/product.controller';
import { newProductValidator } from '../validators/product.validator';
import { adminAuth, upload } from '../middlewares/auth.middleware';

const router = express.Router();

//route to get all products
router.get('/get', productController.getAllProducts);

router.get('/get/new', productController.getNewProducts);

router.get('/get/featured', productController.getFeaturedProducts);

router.get('/get/discount', productController.getTodaysDeal);

//route to create a new product
router.post(
  '/add',
  adminAuth,
  upload.single('imageUrl'),
  newProductValidator,
  productController.newProduct
);

//route to get a single product by their product id
router.get('/get/:_id', productController.getProduct);

//route to update a single product by their product id
router.put(
  '/edit/:_id',
  adminAuth,
  upload.single('imageUrl'),
  productController.updateProduct
);

//route to delete a single product by their product id
router.delete('/delete/:_id', adminAuth, productController.deleteProduct);

export default router;
