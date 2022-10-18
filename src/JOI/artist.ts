import Joi from "joi";

const artistValidator = {
  post: Joi.object().keys({
    name: Joi.string(),
    picture: Joi.string(),
  }),
  put: Joi.object().keys({
    name: Joi.string(),
    picture: Joi.string(),
  }),
};

export default artistValidator;
