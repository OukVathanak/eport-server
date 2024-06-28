/**
 * section service
 */

import { factories } from "@strapi/strapi";
import {
  Section,
  SectionDTO,
  SectionDVO,
  SectionQueryParams,
} from "../../../../types/collections/section";

export default factories.createCoreService(
  "api::section.section",
  ({ strapi }) => {
    return {
      async getManySection(params: SectionQueryParams): Promise<SectionDVO[]> {
        try {
          const sections = (await strapi
            .query("api::section.section")
            .findMany(params)) as Section[];

          if (sections.length === 0) {
            return [];
          }

          return sections.map((section) => new SectionDVO(section as Section));
        } catch (error) {
          throw new Error(error);
        }
      },

      async getOneSection(params: SectionQueryParams): Promise<SectionDVO> {
        try {
          const section = (await strapi
            .query("api::section.section")
            .findOne(params)) as Section;

          if (section) {
            return null;
          }

          return new SectionDVO(section);
        } catch (error) {
          throw new Error(error);
        }
      },

      async postSection(payload: SectionDTO): Promise<SectionDVO> {
        try {
          const section = (await strapi.entityService.create(
            "api::section.section",
            { data: payload }
          )) as Section;

          return new SectionDVO(section);
        } catch (error) {
          throw new Error(error);
        }
      },

      async putSection(payload: SectionDTO): Promise<SectionDVO> {
        try {
          const section = (await strapi.entityService.update(
            "api::section.section",
            payload.id,
            { data: payload }
          )) as Section;

          return new SectionDVO(section);
        } catch (error) {
          throw new Error(error);
        }
      },
    };
  }
);
