/**
 * home-page controller
 */

import { factories } from "@strapi/strapi";
import { UserApp, UserAppQueryParams } from "../../../../types/collections/user-app";
import {
  APIResponse,
  HTTPCode,
  createErrorResponse,
  createSuccessResponse,
} from "../../../utils/response";
import { HomePage, HomePageDTO } from "../../../../types/collections/home-page";

export default factories.createCoreController(
  "api::home-page.home-page",
  ({ strapi }) => {
    return {
      // ---------- Find Homepage ----------
      async findHomePage(ctx) {
        try {
          // Get user from params
          const { username } = ctx.params;

          // Query param
          const queryParams: UserAppQueryParams = {
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

      // ---------- Update Homepage ----------
      async updateHomePage(ctx) {
        try {
          // Get user from context
          const user: UserApp = ctx.state.user;

          // Query for user
          const queryParams: UserAppQueryParams = {
            where: {
              id: { $eq: user.id },
            },
          };

          // Fetch user
          const userApp: UserApp = await strapi
            .service("api::home-page.home-page")
            .getOneHomePage(queryParams);

          // Check if user exist
          if (!userApp) {
            const response: APIResponse = createErrorResponse(
              HTTPCode.UNAUTHORIZE
            );
            ctx.throw(response.statusCode, response.error);
          }

          // Homepage payload
          const payload: HomePageDTO = ctx.request.body;
          const homePagePayload: HomePageDTO = {
            id: 1,
            heroTitle: payload.heroTitle,
            heroDescription: payload.heroDescription,
            heroImageUrl: payload.heroImageUrl,
            userApp: user.id,
          };

          // Update homepage
          const homePage: HomePage = await strapi
            .service("api::home-page.home-page")
            .putHomePage(homePagePayload);

          const response: APIResponse = createSuccessResponse(
            HTTPCode.SUCCESS,
            { homePage }
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
