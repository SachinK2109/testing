import HttpStatus from 'http-status-codes';
import * as cart from '../services/cart.service';

/**
 * Controller to get all orderss available
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const addProductToCart = async (req, res, next) => {
  try {
    const data = await cart.addProductToCart(
      res.locals.userId,
      req.params.productId
    );
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'Product Added to cart successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};

/**
 * Controller to get all orderss available
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const updateProductToCart = async (req, res, next) => {
  try {
    console.log(req.params.productId, req.body);
    const data = await cart.updateProductToCart(
      res.locals.userId,
      req.params.productId,
      req.body.quantity
    );
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'Cart updated successfully'
    });
  } catch (error) {
    res.status(HttpStatus.NOT_FOUND).json({
      code: HttpStatus.NOT_FOUND,
      message: `${error}`
    });
  }
};

/**
 * Controller to get all orderss available
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const removeProductFromCart = async (req, res, next) => {
  try {
    const data = await cart.removeProductFromCart(
      res.locals.userId,
      req.params.productId
    );
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Product removed from cart successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};

/**
 * Controller to get all orderss available
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const clearCart = async (req, res, next) => {
  try {
    const data = await cart.clearCart(res.locals.userId);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Cart Cleared Successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};

/**
 * Controller to get all orderss available
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getCart = async (req, res, next) => {
  try {
    const data = await cart.getCartByUserId(res.locals.userId);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Cart fetched successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `error while fetching cart ${error}`
    });
  }
};
