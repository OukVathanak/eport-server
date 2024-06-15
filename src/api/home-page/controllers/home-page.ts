/**
 * home-page controller
 */

import { factories } from "@strapi/strapi";
import { UserApp } from "../../../../types/collections/user-app";
import { QueryParams } from "../../../utils/interface";

export default factories.createCoreController(
  "api::home-page.home-page",
  ({ strapi }) => {
    return {
      async findHomePage(ctx) {
        try {
          const { user } = ctx.params;

          const queryParams: QueryParams = {
            where: { username: { $eq: user } },
            populate: {
              homePage: true,
              skills: true,
              socials: true,
              projects: true,
            },
          };

          const findUser: UserApp = await strapi
            .service("api::user-app.user-app")
            .getOneUserApp(queryParams);

          return findUser;
        } catch (error) {
          throw new Error(error);
        }
      },
    };
  }
);
