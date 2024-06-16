import Joi from "joi";

export const loginSchema = Joi.object({
  identifier: Joi.string().required(),
  password: Joi.string().required(),
});

export interface LoginDTO {
  identifier: string;
  password: string;
}
