/**
 * project controller
 */

import { factories } from "@strapi/strapi";
import { Project } from "../../../../types/collections/project";
import { QueryParams } from "../../../utils/interface";
import {
  APIResponse,
  HTTPCode,
  createErrorResponse,
  createSuccessResponse,
} from "../../../utils/response";
import { UserApp } from "../../../../types/collections/user-app";

export default factories.createCoreController(
  "api::project.project",
  ({ strapi }) => {
    return {
      async findProject(ctx) {
        try {
          // Get id from param;
          const { id } = ctx.params;

          // Project query params
          const projectQueryParams: QueryParams = {
            where: {
              $and: [{ id: { $eq: id } }],
            },
            populate: {
              userApp: { where: { isHidden: { $eq: false } } },
              sections: {
                populate: {
                  contributors: true,
                  details: { populate: { images: true } },
                },
              },
            },
          };

          // Get project
          const project: Project = await strapi
            .service("api::project.project")
            .getOneProject(projectQueryParams);

          // Check is user is hidden
          if (!project || !project.userApp) {
            const response: APIResponse = createErrorResponse(
              HTTPCode.NOT_FOUND
            );
            ctx.throw(response.statusCode, "Project not found");
          }

          // Response
          const response: APIResponse = createSuccessResponse(
            HTTPCode.SUCCESS,
            project
          );
          ctx.send(response, response.statusCode);
        } catch (error) {
          ctx.throw(error.statusCode, error.message);
        }
      },

      async allProject(ctx) {
        try {
          // Get user from context
          const user: UserApp = ctx.state.user;

          // Query params
          const queryParams: QueryParams = {
            where: {
              id: { $eq: user.id },
            },
            populate: { projects: true },
          };

          // Query user projects
          const findUser: UserApp = await strapi
            .service("api::user-app.user-app")
            .getOneUserApp(queryParams);

          // Check if user exist
          if (!findUser) {
            const response: APIResponse = createErrorResponse(
              HTTPCode.UNAUTHORIZE
            );
            ctx.throw(response.statusCode, response.error);
          }

          // User projects
          const projects: Project[] = findUser.projects;

          // Response
          const response: APIResponse = createSuccessResponse(
            HTTPCode.SUCCESS,
            { projects }
          );
          ctx.send(response, response.statusCode);
        } catch (error) {
          ctx.throw(error.statusCode, error.message);
        }
      },
    };
  }
);
