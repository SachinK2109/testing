import Review from '../models/review.model';
import Product from '../models/product.model';

//get all reviews
export const getAllReviews = async (prodId) => {
  const data = await Review.find({ productId: prodId });
  return data;
};

//create new review
export const newReview = async (userId, body) => {
  const prodId = body.prodId;
  const rating = body.rating;
  const title = body.title;
  const description = body.description;
  const product = await Product.findById(prodId);
  if (!product) {
    throw new Error('Product does not exist');
  }
  let review = new Review({
    owner: userId,
    productId: prodId,
    title: title,
    description: description,
    rating: rating
  });
  product.reviews.push(review._id);
  await product.save();
  return await review.save();
};

//update single review
export const updateReview = async (_id, body) => {
  const data = await Review.findByIdAndUpdate(
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

//delete single review
export const deleteReview = async (id) => {
  await Review.findByIdAndDelete(id);
  return '';
};

//get single review
export const getReview = async (id) => {
  const data = await Review.findById(id);
  return data;
};
