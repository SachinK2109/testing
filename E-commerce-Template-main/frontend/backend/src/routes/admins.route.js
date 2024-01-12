import express from 'express';
import * as adminsController from '../controllers/admins.controller';
import {
  loginAdminValidator,
  newAdminValidator
} from '../validators/admins.validator';
import { adminAuth } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/get', adminAuth, adminsController.getAllAdmins);

router.post('/add', adminAuth, newAdminValidator, adminsController.newAdmin);

//route to login admin
router.post('/login', loginAdminValidator, adminsController.loginAdmin);

//route to get a single admins by their admins id
router.get('/get/:_id', adminAuth, adminsController.getAdmin);

//route to update a single admins by their admins id
router.put('/edit/:_id', adminAuth, adminsController.updateAdmin);

//route to delete a single admins by their admins id
router.delete('/delete/:_id', adminAuth, adminsController.deleteAdmin);

export default router;
