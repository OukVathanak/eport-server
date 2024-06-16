import { Middleware } from "koa";
import { Strapi } from "@strapi/strapi";
require("dotenv");

interface Config {
  // ---------- Custom Configuration ----------
}

const errorHandler: Middleware = (
  config: Config,
  { strapi }: { strapi: Strapi }
) => {
  return async (ctx, next) => {
    try {
      await next();
    } catch (error: any) {
      strapi.log.error(error);
      console.log(error);

      ctx.status = error.status;

      ctx.body = {
        status: ctx.status,
        message: error.message || "An unexpected error occured",
        stack:
          process.env.SERVER_STATE == "development"
            ? error.details || error.stack || null
            : null,
      };
    }
  };
};

export default errorHandler;
