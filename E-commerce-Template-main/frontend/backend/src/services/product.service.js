import Product from '../models/product.model';
import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';
dotenv.config();

const s3Client = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
  },
  region: 'ap-south-1'
});

//get all products
export const getAllProducts = async () => {
  const data = await Product.find();
  return data;
};

//get all products
export const getNewProducts = async () => {
  const data = await Product.find().sort({ createdAt: -1 }).limit(10);
  return data;
};

//get all products
export const getFeaturedProducts = async () => {
  const data = await Product.find({ isFeatured: true })
    .sort({ createdAt: -1 })
    .limit(10);
  return data;
};

//get all products
export const getTodaysDeal = async () => {
  const data = await Product.find({ discount: { $gt: 0 } })
    .sort({ createdAt: -1 })
    .limit(10);
  return data;
};

//create new product
export const newProduct = async (body, imageUrl, adminId) => {
  console.log('body', body, imageUrl, adminId);
  const product = { ...body, imageUrl: imageUrl, owner: adminId };
  console.log(product);
  const data = await Product.create(product);
  return data;
};

export const updateProduct = async (_id, body, fileLocation) => {
  const product = await Product.findById(_id);
  if (!product) {
    throw new Error('No product found');
  }

  // If there's a new image file, update imageUrl and delete the old image from S3
  if (fileLocation) {
    console.log('key', product.imageUrl.split('/').slice(-1)[0]);
    const deleteParams = {
      Bucket: 'ecommern',
      Key: product.imageUrl.split('/').slice(-1)[0]
    };

    await s3Client.send(new DeleteObjectCommand(deleteParams));
    product.imageUrl = fileLocation;
  }
  const updateProduct = { ...body, imageUrl: fileLocation || body.imageUrl };
  // Note: You might need additional logic to handle cases where neither a new file nor an imageUrl is provided

  console.log(body);
  const updatedProduct = await Product.findByIdAndUpdate(_id, updateProduct, {
    new: true
  });
  return updatedProduct;
};

//delete single product
export const deleteProduct = async (id) => {
  const product = await Product.findById(id);
  if (!product) {
    throw new Error('No product found');
  }

  const res = await Product.findByIdAndDelete(id);
  if (res) {
    const deleteParams = {
      Bucket: 'ecommern',
      Key: product.imageUrl.split('/').slice(-1)[0]
    };
    await s3Client.send(new DeleteObjectCommand(deleteParams));
  }
  return '';
};

//get single product
export const getProduct = async (id) => {
  const data = await Product.findById(id);
  return data;
};
