import Admin from '../models/admin.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

//login admin
export const loginAdmin = async (body) => {
  const admin = await Admin.findOne({
    email: body.email
  });
  if (!admin) {
    throw new Error('Admin Not Found !!');
  }

  const hashedPassword = admin.password;
  const isTrue = bcrypt.compareSync(body.password, hashedPassword);
  if (isTrue) {
    var token = jwt.sign(
      { email: admin.email, id: admin.id },
      process.env.SECRET_KEY
    );
    return token;
  } else {
    throw new Error('Password Incorrect');
  }
};

//get all admins
export const getAllAdmins = async () => {
  const data = await Admin.find();
  if (data.length > 1) {
    return data;
  } else {
    throw new Error('No admins Found');
  }
};

//create new admin
export const newAdmin = async (body) => {
  const admin = await Admin.findOne({ email: body.email });
  if (admin) {
    throw new Error('You are already registered !!');
  }

  const saltRounds = 10;
  const hashPass = bcrypt.hashSync(body.password, saltRounds);
  body.password = hashPass;

  const data = await Admin.create(body);

  if (data) {
    const { email } = data;
    return { email };
  } else {
    throw new Error('Unable to register !!');
  }
};

//update single admin
export const updateAdmin = async (_id, body) => {
  const data = await Admin.findByIdAndUpdate(
    {
      _id
    },
    body,
    {
      new: true
    }
  );
  if (data) {
    return data;
  } else {
    throw new Error('Cannot find the Id.Please Enter valid Id');
  }
};

//delete single admin
export const deleteAdmin = async (id) => {
  try {
    await Admin.findByIdAndDelete(id);

    return '';
  } catch (error) {
    throw new Error('Cannot find the id to delete');
  }
};

//get single admin
export const getAdmin = async (id) => {
  const data = await Admin.findById(id);
  return data;
};
