import HttpStatus from 'http-status-codes';
import * as ProductService from '../services/product.service';

/**
 * Controller to get all products available
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getAllProducts = async (req, res, next) => {
  try {
    const data = await ProductService.getAllProducts();
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'All products fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to get a single product
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getProduct = async (req, res, next) => {
  try {
    const data = await ProductService.getProduct(req.params._id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Product fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to get all products available
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getNewProducts = async (req, res, next) => {
  try {
    const data = await ProductService.getNewProducts();
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'All products fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to get all products available
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getFeaturedProducts = async (req, res, next) => {
  try {
    const data = await ProductService.getFeaturedProducts();
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'All products fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to get all products available
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getTodaysDeal = async (req, res, next) => {
  try {
    const data = await ProductService.getTodaysDeal();
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'All products fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to create a new product
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const newProduct = async (req, res, next) => {
  try {
    console.log(req.body);
    const imageUrl = req.file.location;
    console.log('imageUrl', imageUrl);
    const data = await ProductService.newProduct(
      req.body,
      imageUrl,
      res.locals.adminId
    );
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'Product created successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to update a product
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const updateProduct = async (req, res, next) => {
  try {
    const fileLocation = req.file ? req.file.location : null;
    const data = await ProductService.updateProduct(
      req.params._id,
      req.body,
      fileLocation
    );
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'Product updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to delete a product
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const deleteProduct = async (req, res, next) => {
  try {
    await ProductService.deleteProduct(req.params._id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: [],
      message: 'Product deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
