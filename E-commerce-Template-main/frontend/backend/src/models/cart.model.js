import { Schema, model } from 'mongoose';

const cartSchema = new Schema(
  {
    user: {
      userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
      }
    },
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        quantity: {
          type: Number,
          required: true
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

// Utility method to find an item index in the cart
cartSchema.methods.findCartItemIndex = function (productId) {
  const index = this.items.findIndex(
    (item) => item.productId.toString() === productId.toString()
  );
  console.log(index);
  return index;
};

// Add to cart
cartSchema.methods.addToCart = function (productId) {
  const cartItemIndex = this.findCartItemIndex(productId);
  let newQuantity = 1;
  let updatedCartItems = [...this.items];

  if (cartItemIndex >= 0) {
    newQuantity = this.items[cartItemIndex].quantity + quantity;
    updatedCartItems[cartItemIndex].quantity = newQuantity;
  } else {
    updatedCartItems.push({
      productId: productId,
      quantity: newQuantity
    });
  }
  this.items = updatedCartItems;
  return this.save();
};

// Update cart items
cartSchema.methods.updateCartItems = function (productId, quantity) {
  const cartItemIndex = this.findCartItemIndex(productId);
  console.log(cartItemIndex);
  if (cartItemIndex >= 0) {
    this.items[cartItemIndex].quantity = quantity;
    return this.save();
  } else {
    throw new Error('Product not found in cart');
  }
};

// Delete product from cart
cartSchema.methods.deleteProductFromCart = function (productId) {
  this.items = this.items.filter(
    (item) => item.productId.toString() !== productId.toString()
  );
  return this.save();
};

// Create a cart if it doesn't exist
cartSchema.statics.createCart = async function (userId) {
  cart = new this({
    user: {
      userId: userId
    },
    items: []
  });
  return cart;
};

export default model('Cart', cartSchema);
