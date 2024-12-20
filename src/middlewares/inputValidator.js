import Joi from "joi";

const userScheme = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
});

const accScheme = Joi.object({
  name: Joi.string().min(3).required(),
  address: Joi.string().min(5).required(),
  description: Joi.string().min(5).required(),
});

const validateUser = (req, res, next) => {
  const { error } = userScheme.validate(req.body);
  if (error)
    return res.status(400).json({
      status: 400,
      message: error.details[0].message,
    });
  next();
};
const validateAcc = (req, res, next) => {
  const { error } = accScheme.validate(req.body);
  if (error)
    return res.status(400).json({
      status: 400,
      message: error.details[0].message,
    });
  next();
};

export default validateUser;
export { validateAcc };
