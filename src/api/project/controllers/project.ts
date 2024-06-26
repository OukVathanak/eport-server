/**
 * project controller
 */

import { factories } from "@strapi/strapi";
import {
  Project,
  ProjectDTO,
  ProjectQueryParams,
} from "../../../../types/collections/project";
import {
  APIResponse,
  HTTPCode,
  createErrorResponse,
  createSuccessResponse,
} from "../../../utils/response";
import { UserApp, UserAppQueryParams } from "../../../../types/collections/user-app";
import { fetchUserAndProjects } from "../../../utils/helpers";
import { RequestHelper } from "../../../utils/request-helper";

export default factories.createCoreController(
  "api::project.project",
  ({ strapi }) => {
    return {
      // ---------- Fine one project ----------
      async findProject(ctx) {
        try {
          // Get id from param;
          const { id } = ctx.params;

          const testParam: ProjectQueryParams = {
            where: { $and: [{ publishedAt: { $null: false } }, {}] },
            populate: {userApp: {where: {}}}
          };

          // Project query params
          const projectQueryParams: ProjectQueryParams = {
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

      // ---------- Update Project ----------
      async updateProject(ctx) {
        try {
          // Get user from context
          const user: UserApp = ctx.state.user;

          // User query param
          const userQueryParams: UserAppQueryParams = {
            where: {
              id: { $eq: user.id },
            },
            populate: {
              projects: true,
            },
          };

          // Get user
          const userApp: UserApp = await strapi
            .service("api::user-app.user-app")
            .getOneUserApp(userQueryParams);

          // Check if user exist
          if (!userApp) {
            const response: APIResponse = createErrorResponse(
              HTTPCode.FORBIDDEN
            );
            ctx.throw(response.statusCode, response.error);
          }

          const response: APIResponse = createSuccessResponse(
            HTTPCode.SUCCESS,
            { userApp }
          );
          ctx.send(response, response.statusCode);
        } catch (error) {
          ctx.throw(error.statusCode, error.message);
        }
      },

      // ---------- Delete Project ----------
      async deleteProject(ctx) {
        try {
          const requestHelper = new RequestHelper(ctx);

          // Get user from context
          const user: UserApp = requestHelper.getCurrentUser();

          // Get project
          const projectId: string = requestHelper.getParam("id");

          // Query param to check for user and project
          const queryParams: UserAppQueryParams = {
            where: {
              id: { $eq: user.id },
            },
            populate: {
              projects: {
                where: {
                  id: { $eq: projectId },
                },
              },
            },
          };

          // Find user and project
          const userApp: UserApp = await strapi
            .service("api::user-app.user-app")
            .getOneUserApp(queryParams);

          // Check if user exist
          if (!userApp) {
            const response: APIResponse = createErrorResponse(
              HTTPCode.UNAUTHORIZE
            );
            ctx.throw(response.statusCode, response.error);
          }

          // Check if project exist
          if (!userApp.projects[0] || userApp.projects.length == 0) {
            const response: APIResponse = createErrorResponse(
              HTTPCode.NOT_FOUND
            );
            ctx.throw(response.statusCode, response.error);
          }

          // Delete project
          await strapi.service("api::project.project").deleteProject(projectId);

          const response: APIResponse = createSuccessResponse(HTTPCode.SUCCESS);

          ctx.send(response, response.statusCode);
        } catch (error) {
          ctx.throw(error.statusCode, error.message);
        }
      },
    };
  }
);
