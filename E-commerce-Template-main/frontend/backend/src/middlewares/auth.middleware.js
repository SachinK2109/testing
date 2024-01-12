import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { S3Client } from '@aws-sdk/client-s3';
import multer from 'multer';
import multerS3 from 'multer-s3';
// const aws = require('aws-sdk');
// const multer = require('multer');
// const multerS3 = require('multer-s3');

dotenv.config();

/**
 * Middleware to authenticate if user has a valid Authorization token
 * Authorization: Bearer <token>
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const userAuth = async (req, res, next) => {
  try {
    let bearerToken = req.header('Authorization');
    if (!bearerToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };
    bearerToken = bearerToken.split(' ')[1];

    const { id, email } = await jwt.verify(bearerToken, process.env.SECRET_KEY);
    res.locals.userId = id;
    res.locals.email = email;
    next();
  } catch (error) {
    next(error);
  }
};

/**
 * Middleware to authenticate if admin has a valid Authorization token
 * Authorization: Bearer <token>
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const adminAuth = async (req, res, next) => {
  try {
    let bearerToken = req.header('Authorization');
    if (!bearerToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };
    bearerToken = bearerToken.split(' ')[1];
    console.log('log', bearerToken);
    const { id } = await jwt.verify(bearerToken, process.env.SECRET_KEY);
    res.locals.adminId = id;
    res.locals.admintoken = bearerToken;
    next();
  } catch (error) {
    next(error);
  }
};

const s3Client = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
  },
  region: 'ap-south-1'
});

export const upload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: 'ecommern',
    metadata: function (req, file, cb) {
      cb(null, {
        fieldName: file.fieldname
      });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    }
  })
});
