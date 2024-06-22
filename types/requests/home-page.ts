import Joi from "joi";

export const HomePageSchema = Joi.object({
  heroTitle: Joi.string(),
  heroDescription: Joi.string(),
  heroImageUrl: Joi.string(),
});
