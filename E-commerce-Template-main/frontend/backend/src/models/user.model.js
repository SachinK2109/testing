import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true
    },
    picture: String,
    phone: {
      type: Number
    },
    password: String,
    address: {
      line1: String,
      line2: String,
      city: String,
      state: String,
      country: String,
      postal_code: String
    },
    resetToken: String,
    resetTokenExpiration: Date
  },
  {
    timestamps: true
  }
);

export default model('User', userSchema);
