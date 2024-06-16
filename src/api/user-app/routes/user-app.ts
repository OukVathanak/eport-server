/**
 * user-app router
 */

// import { factories } from "@strapi/strapi";
// export default factories.createCoreRouter('api::user-app.user-app');
import validateRequest from "../../../middlewares/request-validation";
import { loginSchema } from "../../../../types/requests/login";

module.exports = {
  routes: [
    {
      method: "POST",
      path: "/auth/login",
      handler: "user-app.login",
      config: {
        auth: false,
        middlewares: [validateRequest(loginSchema, "body")],
      },
    },
  ],
};
