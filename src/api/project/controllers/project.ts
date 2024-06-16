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
              $and: [{ id: { $eq: id } }, { publishedAt: { $null: false } }],
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
            ctx.throw(response.statusCode, response.error);
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
    };
  }
);
