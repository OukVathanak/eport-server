/**
 * project service
 */

import { factories } from "@strapi/strapi";
import { QueryParams } from "../../../utils/interface";
import {
  Project,
  ProjectDTO,
  ProjectDVO,
} from "../../../../types/collections/project";

export default factories.createCoreService(
  "api::project.project",
  ({ strapi }) => {
    return {
      async getManyProject(params: QueryParams): Promise<Project[]> {
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

      async getOneProject(params: QueryParams): Promise<Project> {
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
          )) as ProjectDVO;

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
          )) as ProjectDVO;

          return new ProjectDVO(project);
        } catch (error) {
          throw new Error(error);
        }
      },
    };
  }
);
