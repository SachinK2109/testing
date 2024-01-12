import HttpStatus from 'http-status-codes';
import * as ReviewService from '../services/review.service';

/**
 * Controller to get all reviews available
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getAllReviews = async (req, res, next) => {
  try {
    const data = await ReviewService.getAllReviews(req.params.prodId);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'All reviews fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to get a single review
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getReview = async (req, res, next) => {
  try {
    const data = await ReviewService.getReview(req.params._id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Review fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to create a new review
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const newReview = async (req, res, next) => {
  try {
    const data = await ReviewService.newReview(res.locals.userId, req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'Review created successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to update a review
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const updateReview = async (req, res, next) => {
  try {
    const data = await ReviewService.updateReview(req.params._id, req.body);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'Review updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to delete a review
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const deleteReview = async (req, res, next) => {
  try {
    await ReviewService.deleteReview(req.params._id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: [],
      message: 'Review deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
