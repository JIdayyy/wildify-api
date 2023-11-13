import Joi from "joi";

const playlistValidator = {
  post: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    picture: Joi.string().required(),
  }),
  put: Joi.object().keys({
    title: Joi.string(),
    description: Joi.string(),
    picture: Joi.string(),
  }),
  addSongs: Joi.object().keys({
    songIds: Joi.array().items(Joi.string()).required(),
  }),
  removeSongs: Joi.object().keys({
    songIds: Joi.array().items(Joi.string()).required(),
  }),
};

export default playlistValidator;
