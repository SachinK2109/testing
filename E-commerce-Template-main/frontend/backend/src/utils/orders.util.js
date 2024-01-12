import User from '../models/user.model';
import Cart from '../models/cart.model';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { getCartByUserId } from '../services/cart.service';
dotenv.config();
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

/**
 * Creates a Stripe checkout session for a given user's cart.
 *
 * @param {string} userId - The ID of the user.
 * @returns {Object} - An object containing the session ID and cart details.
 */
export const stripeCheckout = async (userId) => {
  try {
    console.log(`Creating checkout session for user: ${userId}`);
    const cart = await getCartByUserId(userId);
    await cart.populate('items.productId').execPopulate();

    const products = cart.items;
    const total = calculateTotal(products);
    const session = await createStripeSession(userId, products, total);

    return {
      products: products,
      totalSum: total,
      sessionId: session.id
    };
  } catch (error) {
    console.error('Error in stripeCheckout:', error);
    throw error; // Rethrow the error for further handling
  }
};

/**
 * Calculates the total cost of the products in the cart.
 *
 * @param {Array} products - Array of products in the cart.
 * @returns {number} - The total cost.
 */
function calculateTotal(products) {
  return products.reduce((total, p) => {
    const price =
      p.productId.discount > 0 ? p.productId.discount : p.productId.price;
    return total + p.quantity * price;
  }, 0);
}

/**
 * Creates a Stripe checkout session.
 *
 * @param {Array} products - Array of products.
 * @param {number} total - Total cost of the products.
 * @returns {Promise<Object>} - A promise that resolves with the Stripe session.
 */
async function createStripeSession(userId, products, total) {
  const success_token = jwt.sign(
    { userId: userId },
    process.env.CHECKOUT_SUCCESS_TOKEN,
    {
      expiresIn: '1h'
    }
  );
  const user = await User.findById(userId);
  const stripeCustomerId = await createOrUpdateStripeCustomer(
    userId,
    user.address
  );
  // let shippingAddress = {};
  // if (user && user.address) {
  //   shippingAddress = {
  //     name: `${user.firstName}  ${user.lastName}`,
  //     address: {
  //       line1: user.address.line1,
  //       line2: user.address.line2,
  //       city: user.address.city,
  //       state: user.address.state,
  //       postal_code: user.address.postal_code,
  //       country: user.address.country
  //     }
  //   };
  // }
  return stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    customer: stripeCustomerId,
    shipping_address_collection: {
      allowed_countries: ['IN'] // Specify allowed countries
    },
    line_items: products.map((p) => ({
      price_data: {
        unit_amount:
          (p.productId.discount > 0
            ? p.productId.discount
            : p.productId.price) * 100,
        currency: 'inr',
        product_data: {
          name: p.productId.title,
          description: p.productId.description
        }
      },
      quantity: p.quantity
    })),
    success_url: `http://localhost:3001/checkout/success/${success_token}`,
    cancel_url: 'http://localhost:3001/cart'
  });
}

async function createOrUpdateStripeCustomer(userId, userAddress) {
  const user = await User.findById(userId);
  let stripeCustomerId = user.stripeCustomerId;

  if (stripeCustomerId) {
    // Update existing Stripe customer
    await stripe.customers.update(stripeCustomerId, {
      address: userAddress
    });
  } else {
    // Create new Stripe customer
    const newCustomer = await stripe.customers.create({
      email: user.email,
      name: user.name,
      address: userAddress
    });
    stripeCustomerId = newCustomer.id;
    // Save the Stripe customer ID to your User model
    user.stripeCustomerId = stripeCustomerId;
    await user.save();
  }

  return stripeCustomerId;
}
