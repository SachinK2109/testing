import { Schema, model } from 'mongoose';

const ordersSchema = new Schema(
  {
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        quantity: { type: Number, required: true },
        status: { type: String, default: 'Pending' }
      }
    ],
    user: {
      userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
      }
    },
    status: {
      type: String,
      default: 'Pending'
    }
  },
  {
    timestamps: true
  }
);

export default model('Orders', ordersSchema);
