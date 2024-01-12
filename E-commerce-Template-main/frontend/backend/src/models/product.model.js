import { Schema, model } from 'mongoose';

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    brand: {
      type: String,
      required: true
    },
    isFeatured: Boolean,
    imageUrl: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Review'
      }
    ],
    category: {
      type: String,
      required: true
    },
    // subCategory: {
    //   type: String,
    //   required: true
    // },
    quantity: {
      type: Number,
      min: 0
    },
    isFeatured: {
      type: Boolean,
      deafult: false
    },
    discount: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

export default model('Product', productSchema);
