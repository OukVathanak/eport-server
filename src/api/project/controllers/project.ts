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
import image from "../../image/controllers/image";

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

      // ---------- Update Project ----------
      async updateProject(ctx) {
        try {
          // Get user from context
          const user: UserApp = ctx.state.user;
          const { id } = ctx.params;
          const { newOrder } = ctx.request.body;

          // User and populate project query param
          const userQueryParams: QueryParams = {
            where: {
              id: { $eq: user.id },
            },
            populate: {
              projects: {
                where: {
                  id: { $eq: id },
                },
              },
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

          // Check if project exist
          if (!userApp.projects[0] || userApp.projects.length === 0) {
            const response: APIResponse = createErrorResponse(
              HTTPCode.NOT_FOUND
            );
            ctx.throw(response.statusCode, response.error);
          }

          // Update payload
          const payload: ProjectDTO = ctx.request.body;
          const updatePayload: ProjectDTO = {
            id: id,
            name: payload.name,
            description: payload.description,
            imageUrl: payload.imageUrl,
            status: payload.status,
            order: payload.order,
            userApp: user.id,
          };

          // Loop through all projects to check for order update
          const allProjects: Project[] = await fetchUserAndProjects(ctx);
          let updatedOrder = newOrder;

          // If updated project order is smaller or equal another project order, we update project order that is equal and less than the updated order
          for (const project of allProjects) {
            if (newOrder <= project.order) {
              updatedOrder++;
              // const updatedOrderPayload1: ProjectDTO = {
              //   id: project.id,
              //   name: project.name,
              //   description: project.description,
              //   imageUrl: project.imageUrl,
              //   status: project.status,
              //   order: updatedOrder,
              // };
              let updatedOrderPayload: Project = project;
              updatedOrderPayload.order = updatedOrder;
              await strapi
                .service("api::project.project")
                .putProject(updatedOrderPayload);
            }
          }

          const response: APIResponse = createSuccessResponse(
            HTTPCode.SUCCESS,
            { userApp, allProjects }
          );
          ctx.send(response, response.statusCode);
        } catch (error) {
          ctx.throw(error.statusCode, error.message);
        }
      },

      // ---------- Delete Project ----------
      async deleteProject(ctx) {
        try {
          // Get user from context
          const user: UserApp = ctx.state.user;
          const { id } = ctx.params;

          // User and populate project query param
          const userQueryParams: QueryParams = {
            where: {
              id: { $eq: user.id },
            },
            populate: {
              projects: {
                where: {
                  id: { $eq: id },
                },
              },
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

          // Check if project exist
          if (!userApp.projects || userApp.projects.length === 0) {
            const response: APIResponse = createErrorResponse(
              HTTPCode.NOT_FOUND
            );
            ctx.throw(response.statusCode, response.error);
          }

          // Delete project
          await strapi.service("api::project.project").deleteProject(id);

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
