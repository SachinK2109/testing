import HttpStatus from 'http-status-codes';
import * as OrdersService from '../services/orders.service';

/**
 * Controller to get all orderss available
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const checkoutOrder = async (req, res, next) => {
  try {
    const data = await OrdersService.checkoutOrder(res.locals.userId);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'checkout is done'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to get all orderss available
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getAllAdminOrders = async (req, res, next) => {
  try {
    const data = await OrdersService.getAllAdminOrders();
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'All orderss fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to get all orderss available
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getAllOrders = async (req, res, next) => {
  try {
    const data = await OrdersService.getAllOrders(res.locals.userId);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'All orderss fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to get a single orders
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getOrders = async (req, res, next) => {
  try {
    const data = await OrdersService.getOrders(req.params._id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Orders fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to create a new orders
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const newOrders = async (req, res, next) => {
  try {
    const data = await OrdersService.newOrders(res.locals.userId, req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'Orders created successfully'
    });
  } catch (error) {
    next(error);
  }
};

// /**
//  * Controller to update a orders
//  * @param  {object} req - request object
//  * @param {object} res - response object
//  * @param {Function} next
//  */
// export const updateOrders = async (req, res, next) => {
//   try {
//     const data = await OrdersService.updateOrders(req.params._id, req.body);
//     res.status(HttpStatus.ACCEPTED).json({
//       code: HttpStatus.ACCEPTED,
//       data: data,
//       message: 'Orders updated successfully'
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// /**
//  * Controller to delete a orders
//  * @param  {object} req - request object
//  * @param {object} res - response object
//  * @param {Function} next
//  */
// export const deleteOrders = async (req, res, next) => {
//   try {
//     await OrdersService.deleteOrders(req.params._id);
//     res.status(HttpStatus.OK).json({
//       code: HttpStatus.OK,
//       data: [],
//       message: 'Orders deleted successfully'
//     });
//   } catch (error) {
//     next(error);
//   }
// };
