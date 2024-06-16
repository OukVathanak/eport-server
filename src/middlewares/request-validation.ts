import { Context, Next } from "koa";
import { Schema } from "joi";

const validateRequest = (
  schema: Schema,
  property: "body" | "query" | "params"
) => {
  return async (ctx: Context, next: Next) => {
    const { error } = schema.validate(ctx.request[property]);
    if (error) {
      ctx.throw(
        400,
        `Validation error: ${error.details.map((x) => x.message).join(", ")}`
      );
    } else {
      await next();
    }
  };
};

export default validateRequest;
