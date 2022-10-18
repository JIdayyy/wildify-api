import Joi from "joi";

const albumValidator = {
  post: Joi.object().keys({
    title: Joi.string().required(),
    picture: Joi.string(),
    artistId: Joi.string().required(),
  }),
  put: Joi.object().keys({
    title: Joi.string(),
    picture: Joi.string(),
    artistId: Joi.string(),
  }),
};

export default albumValidator;
