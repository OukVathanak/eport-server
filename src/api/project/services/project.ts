/**
 * project service
 */

import { factories } from "@strapi/strapi";
import {
  Project,
  ProjectDTO,
  ProjectDVO,
  ProjectQueryParams,
} from "../../../../types/collections/project";

export default factories.createCoreService(
  "api::project.project",
  ({ strapi }) => {
    return {
      async getManyProject(params: ProjectQueryParams): Promise<ProjectDVO[]> {
        try {
          const projects = (await strapi
            .query("api::project.project")
            .findMany(params)) as Project[];

          if (projects.length === 0) {
            return [];
          }

          return projects.map((project) => new ProjectDVO(project as Project));
        } catch (error) {
          throw new Error(error);
        }
      },

      async getOneProject(params: ProjectQueryParams): Promise<ProjectDVO> {
        try {
          const project = (await strapi
            .query("api::project.project")
            .findOne(params)) as Project;

          if (!project) {
            return null;
          }

          return new ProjectDVO(project);
        } catch (error) {
          throw new Error(error);
        }
      },

      async postProject(payload: ProjectDTO): Promise<ProjectDVO> {
        try {
          const project = (await strapi.entityService.create(
            "api::project.project",
            { data: payload }
          )) as Project;

          return new ProjectDVO(project);
        } catch (error) {
          throw new Error(error);
        }
      },

      async putProject(payload: ProjectDTO): Promise<ProjectDVO> {
        try {
          const project = (await strapi.entityService.update(
            "api::project.project",
            payload.id,
            { data: payload }
          )) as Project;

          return new ProjectDVO(project);
        } catch (error) {
          throw new Error(error);
        }
      },

      async deleteProject(id: number): Promise<ProjectDVO> {
        try {
          const project = (await strapi.entityService.delete(
            "api::project.project",
            id,
            {}
          )) as Project;

          return project;
        } catch (error) {
          throw new Error(error);
        }
      },
    };
  }
);
