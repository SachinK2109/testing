export const newOrderValidator = (req, res, next) => {
  const schema = Joi.object({
    products: Joi.string().required(),
    user: Joi.string().required()
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};
