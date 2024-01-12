import Orders from '../models/orders.model';
import Cart from '../models/cart.model';
import { stripeCheckout } from '../utils/orders.util';
import jwt from 'jsonwebtoken';

export const checkoutOrder = async (userId) => {
  const data = await stripeCheckout(userId);
  return data;
};

//get all orderss
export const getAllAdminOrders = async () => {
  const data = await Orders.find()
    .populate('products.productId')
    .populate('user.userId');
  return data;
};

//get all orderss
export const getAllOrders = async (id) => {
  const data = await Orders.find({ 'user.userId': id }).populate(
    'products.productId'
  );
  return data;
};

//create new orders
export const newOrders = async (userId, body) => {
  try {
    console.log(userId, body);
    const decoded = await jwt.verify(
      body.token,
      process.env.CHECKOUT_SUCCESS_TOKEN
    );
    let cart = await Cart.findOne({ 'user.userId': userId });
    const order = {
      products: cart.items,
      user: { userId }
    };
    const data = await Orders.create(order);
    cart.items = [];
    await cart.save();
    return data;
  } catch (err) {
    console.log(err);
  }
};

// //update single orders
// export const updateOrders = async (_id, body) => {
//   const data = await Orders.findByIdAndUpdate(
//     {
//       _id
//     },
//     body,
//     {
//       new: true
//     }
//   );
//   return data;
// };

// //delete single orders
// export const deleteOrders = async (id) => {
//   await Orders.findByIdAndDelete(id);
//   return '';
// };

//get single orders
export const getOrders = async (id) => {
  const data = await Orders.findById(id).populate('products.productId');
  return data;
};
