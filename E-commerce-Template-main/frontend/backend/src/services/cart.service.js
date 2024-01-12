import Cart from '../models/cart.model';
import Product from '../models/product.model';

export const addProductToCart = async (userId, productId) => {
  try {
    let cart = await Cart.findOne({ 'user.userId': userId });
    if (!cart) {
      cart = new Cart({
        user: {
          userId: userId
        },
        items: [] // Initialize with an empty array of items
      });

      // Save the new cart
      await cart.save();
    }

    const product = await Product.findById(productId); // Assuming Product is another model
    if (!product) throw new Error('Product not found.');

    return await cart.addToCart(productId);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateProductToCart = async (userId, productId, quantity) => {
  try {
    // console.log(productId, quantity);
    let cart = await Cart.findOne({ 'user.userId': userId });
    // console.log(productId);
    const product = await Product.findById(productId); // Assuming Product is another model
    console.log(product);
    if (!product) throw new Error('Product not found.');

    return await cart.updateCartItems(productId, quantity);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const removeProductFromCart = async (userId, productId) => {
  try {
    let cart = await Cart.findOne({ 'user.userId': userId });
    if (!cart) {
      throw new Error('Cart not found or cart is empty');
    }
    return await cart.deleteProductFromCart(productId);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const clearCart = async (userId) => {
  try {
    let cart = await Cart.findOne({ 'user.userId': userId });
    if (!cart) {
      throw new Error('Cart not found or cart is empty');
    }
    cart.items = [];
    return await cart.save();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getCartByUserId = async (userId) => {
  const getUserCart = await Cart.findOne({ 'user.userId': userId }).populate(
    'items.productId'
  );
  return getUserCart;
};
