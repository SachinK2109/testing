import HttpStatus from 'http-status-codes';
import * as AdminService from '../services/admins.service';

/**
 * Controller to create a new user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const loginAdmin = async (req, res, next) => {
  try {
    const data = await AdminService.loginAdmin(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'Admin signed In successfully'
    });
  } catch (error) {
    res.status(HttpStatus.NOT_FOUND).json({
      code: HttpStatus.NOT_FOUND,
      message: `${error}`
    });
  }
};

/**
 * Controller to get all admins available
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getAllAdmins = async (req, res, next) => {
  try {
    const data = await AdminService.getAllAdmins();
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'All admins fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to get a single admin
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getAdmin = async (req, res, next) => {
  try {
    const data = await AdminService.getAdmin(req.params._id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Admin fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to create a new admin
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const newAdmin = async (req, res, next) => {
  try {
    const data = await AdminService.newAdmin(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'Admin created successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to update a admin
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const updateAdmin = async (req, res, next) => {
  try {
    const data = await AdminService.updateAdmin(req.params._id, req.body);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'Admin updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to delete a admin
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const deleteAdmin = async (req, res, next) => {
  try {
    await AdminService.deleteAdmin(req.params._id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: [],
      message: 'Admin deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
