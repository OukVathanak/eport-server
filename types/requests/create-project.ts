import Joi from "joi";

export const createProjectSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string(),
  imageUrl: Joi.string(),
  status: Joi.string().required(),
});
