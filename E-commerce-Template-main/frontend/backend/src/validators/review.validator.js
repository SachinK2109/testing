import Joi from '@hapi/joi';

export const newReviewValidator = (req, res, next) => {
  const schema = Joi.object({
    owner: Joi.string().required(),
    prodId: Joi.string().required(),
    rating: Joi.number().required(),
    title: Joi.string().required(),
    description: Joi.string().required()
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};
