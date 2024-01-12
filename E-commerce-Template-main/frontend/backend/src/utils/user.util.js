import dotenv from 'dotenv';
dotenv.config();
import User from '../models/user.model';
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

// var transport = nodemailer.createTransport({
//     host: config.HOST,
//     port: config.MAIL_PORT,
//     auth: {
//       user: config.AUTH.USER,
//       pass: config.AUTH.PASS,
//     }
// });

export const generateToken = async (userEmail) => {
  try {
    crypto.randomBytes(32, async (err, buffer) => {
      if (err) {
        throw new Error('There was an error trying to reset password');
      }
      const token = buffer.toString('hex');
      const user = await User.findOne({ email: userEmail });
      if (!user) {
        throw new Error('No such user with email found');
      }
      user.resetToken = token;
      user.resetTokenExpiration = Date.now() + 3600000;
      await user.save();
      // transport.sendMail({
      //     to: req.body.email,
      //     from: 'shop@node-complete.com',
      //     subject: 'Password reset',
      //     html: `
      //       <p>You requested a password reset</p>
      //       <p>Click this <a href="http://localhost:3000/reset/${token}">link</a> to set a new password.</p>
      //     `
      // });
    });
  } catch (err) {
    return err;
  }
};
