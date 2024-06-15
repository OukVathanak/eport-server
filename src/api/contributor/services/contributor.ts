/**
 * contributor service
 */

import { factories } from "@strapi/strapi";
import { QueryParams } from "../../../utils/interface";
import {
  Contributor,
  ContributorDTO,
  ContributorDVO,
} from "../../../../types/collections/contributor";

export default factories.createCoreService(
  "api::contributor.contributor",
  ({ strapi }) => {
    return {
      async getManyContributor(params: QueryParams): Promise<ContributorDVO[]> {
        try {
          const contributors = (await strapi
            .query("api::contributor.contributor")
            .findMany(params)) as Contributor[];

          if (contributors.length === 0) {
            return [];
          }

          return contributors.map(
            (contributor) => new ContributorDVO(contributor as Contributor)
          );
        } catch (error) {
          throw new Error(error);
        }
      },

      async getOneContributor(params: QueryParams): Promise<ContributorDVO> {
        try {
          const contributors = (await strapi
            .query("api::contributor.contributor")
            .findOne(params)) as Contributor;

          if (!contributors) {
            return null;
          }

          return new ContributorDVO(contributors);
        } catch (error) {
          throw new Error(error);
        }
      },

      async postContributor(payload: ContributorDTO): Promise<ContributorDVO> {
        try {
          const contributor = (await strapi.entityService.create(
            "api::contributor.contributor",
            { data: payload }
          )) as Contributor;

          return new ContributorDVO(contributor);
        } catch (error) {
          throw new Error(error);
        }
      },

      async putContributor(payload: ContributorDTO): Promise<ContributorDVO> {
        try {
          const contributor = (await strapi.entityService.update(
            "api::contributor.contributor",
            payload.id,
            { data: payload }
          )) as Contributor;

          return new ContributorDVO(contributor);
        } catch (error) {
          throw new Error(error);
        }
      },
    };
  }
);
