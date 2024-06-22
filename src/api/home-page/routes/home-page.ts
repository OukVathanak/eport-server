/**
 * home-page router
 */

import { factories } from "@strapi/strapi";
import { config } from "dotenv";
import middlewares from "../../../../config/middlewares";
import auth from "../../../middlewares/auth";
import validateRequest from "../../../middlewares/request-validation";
import { HomePageSchema } from "../../../../types/requests/home-page";

// export default factories.createCoreRouter('api::home-page.home-page');

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/home-page/:username",
      handler: "home-page.findHomePage",
      config: {
        auth: false,
        middlewares: [],
      },
    },
    {
      method: "PUT",
      path: "/home-page/:username",
      handler: "home-page.updateHomePage",
      config: {
        auth: false,
        middlewares: [auth(), validateRequest(HomePageSchema, "body")],
      },
    },
  ],
};
