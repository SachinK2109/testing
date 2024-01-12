import HttpStatus from 'http-status-codes';
import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { generateToken } from '../utils/user.util';
dotenv.config();

//login user
export const loginUser = async (body) => {
  const user = await User.findOne({ email: body.email });
  if (!user) {
    throw new Error('User Not Found !!');
  }

  const hashedPassword = user.password;
  const isTrue = bcrypt.compareSync(body.password, hashedPassword);
  if (isTrue) {
    var token = jwt.sign(
      { email: user.email, id: user.id },
      process.env.SECRET_KEY
    );
    return token;
  } else {
    throw new Error('Password Incorrect');
  }
};

//get all users
export const getAllUsers = async () => {
  const data = await User.find();
  return data;
};

//create new user
export const newUser = async (body) => {
  const user = await User.findOne({ email: body.email });
  if (user) {
    throw new Error('You are already registered !!');
  }

  const saltRounds = 10;
  const hashPass = bcrypt.hashSync(body.password, saltRounds);
  body.password = hashPass;

  const data = await User.create(body);
  if (data) {
    const { firstName, lastName, email } = data;
    return { firstName, lastName, email };
  } else {
    throw new Error('Unable to register !!');
  }
};

//update single user
export const updateUser = async (_id, body) => {
  const data = await User.findByIdAndUpdate(
    {
      _id
    },
    body,
    {
      new: true
    }
  );
  return data;
};

//reset password
export const resetPassword = async (password, id) => {
  const saltRounds = 10;
  const hash = bcrypt.hashSync(password, saltRounds);
  password = hash;
  const update = {
    password: password,
    resetToken: undefined,
    resetTokenExpiration: undefined
  };
  const data = await User.findByIdAndUpdate({ _id: id }, update, {
    new: true
  });
  if (data) {
    return data.email;
  } else {
    throw new Error('Unable to reset Password');
  }
};

//forgot password
export const forgotPassword = async (email) => {
  const data = await User.findOne({ email: email });
  if (data) {
    await generateToken(data.email);
    return 'Token sent !!';
  } else {
    throw new Error('Unable to change Password');
  }
};

//delete single user
export const deleteUser = async (id) => {
  await User.findByIdAndDelete(id);
  return '';
};

//get single user
export const getUser = async (id) => {
  const data = await User.findById(id);
  const { email, firstName, lastName } = data;
  return { email, firstName, lastName };
};
