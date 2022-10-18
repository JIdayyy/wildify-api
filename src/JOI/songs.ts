import Joi from "joi";

const songValidator = {
  put: Joi.object().keys({
    title: Joi.string(),
    link: Joi.string(),
    duration: Joi.string(),
    artistId: Joi.string(),
    albumId: Joi.string(),
  }),
};

export default songValidator;
