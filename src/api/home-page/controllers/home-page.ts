/**
 * home-page controller
 */

import { factories } from "@strapi/strapi";
import { UserApp } from "../../../../types/collections/user-app";
import { QueryParams } from "../../../utils/interface";
import {
  APIResponse,
  HTTPCode,
  createErrorResponse,
  createSuccessResponse,
} from "../../../utils/response";

export default factories.createCoreController(
  "api::home-page.home-page",
  ({ strapi }) => {
    return {
      async findHomePage(ctx) {
        try {
          // Get user from params
          const { username } = ctx.params;

          // Query param
          const queryParams: QueryParams = {
            where: {
              $and: [
                { username: { $eq: username } },
                { isHidden: { $eq: false } },
              ],
            },
            populate: {
              homePage: true,
              skills: { where: { publishedAt: { $null: false } } },
              socials: { where: { publishedAt: { $null: false } } },
              projects: { where: { publishedAt: { $null: false } } },
            },
          };

          // Find user
          const user: UserApp = await strapi
            .service("api::user-app.user-app")
            .getOneUserApp(queryParams);

          // Check if user exist
          if (!user) {
            const response: APIResponse = createErrorResponse(
              HTTPCode.NOT_FOUND
            );
            ctx.throw(response.statusCode, "User not found");
          }

          // Response
          const response: APIResponse = createSuccessResponse(
            HTTPCode.SUCCESS,
            { user }
          );
          ctx.send(response, response.statusCode);
        } catch (error) {
          ctx.throw(error.statusCode, error.message);
        }
      },

      async updateProject(ctx) {
        try {
        } catch (error) {
          ctx.throw(error.statusCode, error.message);
        }
      },
    };
  }
);
