/**
 * project controller
 */

import { factories } from "@strapi/strapi";
import {
  Project,
  ProjectDTO,
  ProjectStatus,
} from "../../../../types/collections/project";
import { QueryParams } from "../../../utils/interface";
import {
  APIResponse,
  HTTPCode,
  createErrorResponse,
  createSuccessResponse,
} from "../../../utils/response";
import { UserApp } from "../../../../types/collections/user-app";
import { fetchUserAndProjects } from "../../../utils/helpers";

export default factories.createCoreController(
  "api::project.project",
  ({ strapi }) => {
    return {
      // ---------- Fine one project ----------
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

      // ---------- Find all projects ----------
      async allProject(ctx) {
        try {
          // User projects
          const projects: Project[] = await fetchUserAndProjects(ctx);

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

      // ---------- Create project ----------
      async createProject(ctx) {
        try {
          const user: UserApp = ctx.state.user;
          const params: ProjectDTO = ctx.request.body;

          // Get projects of the user
          const projects: Project[] = await fetchUserAndProjects(ctx);

          // Get highest order
          const highestOrder: number = projects.reduce((max, project) => {
            return project.order > max ? project.order : max;
          }, 0);

          // Project payload
          const projectPayload: ProjectDTO = {
            name: params.name,
            description: params.description,
            imageUrl: params.imageUrl,
            status: params.status,
            order: highestOrder + 1,
            userApp: user.id,
          };

          // Create project
          await strapi
            .service("api::project.project")
            .postProject(projectPayload);

          // Response
          const response: APIResponse = createSuccessResponse(
            HTTPCode.SUCCESS,
            {}
          );
          ctx.send(response, response.statusCode);
        } catch (error) {
          ctx.throw(error.statusCode, error.message);
        }
      },
    };
  }
);
