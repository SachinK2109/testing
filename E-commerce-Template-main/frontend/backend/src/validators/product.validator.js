import Joi from '@hapi/joi';

export const newProductValidator = (req, res, next) => {
  if (req.body.imageUrl) {
    delete req.body.imageUrl;
  }
  const bodySchema = Joi.object({
    title: Joi.string().min(2).required(),
    brand: Joi.string().min(2).required(),
    description: Joi.string().required(),
    imageUrl: Joi.string().allow('', null).optional(),
    price: Joi.number().required(),
    discount: Joi.number().required(),
    category: Joi.string().required(),
    quantity: Joi.number().required()
  });

  // Validate body
  const { error: bodyError } = bodySchema.validate(req.body);
  if (bodyError) {
    return next(bodyError);
  }

  // Validate file (assuming file is uploaded under 'imageUrl' field)
  const file = req.file || req.files?.imageUrl; // Adjust according to your file upload logic
  if (!file) {
    return next(new Error('Image file is required.'));
  }

  // Example: Basic file type and size validation
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (!allowedMimeTypes.includes(file.mimetype)) {
    return next(
      new Error('Invalid file type. Only JPEG, PNG, and GIF are allowed.')
    );
  }

  const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSizeInBytes) {
    return next(new Error('File size should not exceed 5MB.'));
  }

  // Continue if all validations pass
  req.validatedBody = { ...req.body, imageUrl: file.location };
  next();
};
