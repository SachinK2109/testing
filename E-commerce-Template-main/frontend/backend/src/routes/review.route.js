import express from 'express';
import * as reviewController from '../controllers/review.controller';
import { newReviewValidator } from '../validators/review.validator';
import { reviewAuth, userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to get all reviews
router.get('/get/:prodId', reviewController.getAllReviews);

//route to create a new review
router.post('/add', newReviewValidator, userAuth, reviewController.newReview);

//route to get a single review by their review id
// router.get('/:_id', reviewAuth, reviewController.getReview);

//route to update a single review by their review id
router.put('/edit/:_id', userAuth, reviewController.updateReview);

//route to delete a single review by their review id
router.delete('/delete/:_id', userAuth, reviewController.deleteReview);

export default router;
