import express from 'express';
import * as userController from '../controllers/user.controller';
import {
  loginUserValidator,
  newUserValidator
} from '../validators/user.validator';
import { adminAuth, userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to get all users
router.get('/get', adminAuth, userController.getAllUsers);

//route to create a new user
router.post('/add', newUserValidator, userController.newUser);

//route to login a user
router.post('/login', loginUserValidator, userController.loginUser);

//route to get a single user by their user id
router.get('/profile', userAuth, userController.getUser);

//route to update a single user by their user id
router.put('/profile/edit', userAuth, userController.updateUser);

// to reset password
router.put('/reset/:token', userAuth, userController.resetPassword);

// to reset password
router.post('/forgot', userController.forgotPassword);

//route to delete a single user by their user id
router.delete('/delete/:_id', adminAuth, userController.deleteUser);

export default router;
