import Joi from "joi";

const genreValidator = {
  post: Joi.object().keys({
    name: Joi.string(),
  }),
  put: Joi.object().keys({
    name: Joi.string(),
  }),
};

export default genreValidator;
