/**
 * detail service
 */

import { factories } from "@strapi/strapi";
import { QueryParams } from "../../../utils/interface";
import {
  Detail,
  DetailDTO,
  DetailDVO,
} from "../../../../types/collections/detail";

export default factories.createCoreService(
  "api::detail.detail",
  ({ strapi }) => {
    return {
      async getManyDetail(params: QueryParams): Promise<DetailDVO[]> {
        try {
          const details = (await strapi
            .query("api::detail.detail")
            .findMany(params)) as DetailDVO[];

          if (details.length === 0) {
            return [];
          }

          return details.map((detail) => new DetailDVO(detail as Detail));
        } catch (error) {
          throw new Error(error);
        }
      },

      async getOneDetail(params: QueryParams): Promise<DetailDVO> {
        try {
          const detail = (await strapi
            .query("api::detail.detail")
            .findOne(params)) as Detail;

          if (!detail) {
            null;
          }

          return new DetailDVO(detail);
        } catch (error) {
          throw new Error(error);
        }
      },

      async postDetail(payload: DetailDTO): Promise<DetailDVO> {
        try {
          const detail = (await strapi.entityService.create(
            "api::detail.detail",
            { data: payload }
          )) as Detail;

          return new DetailDVO(detail);
        } catch (error) {
          throw new Error(error);
        }
      },

      async putDetail(payload: DetailDTO): Promise<DetailDVO> {
        try {
          const detail = (await strapi.entityService.update(
            "api::detail.detail",
            payload.id,
            { data: payload }
          )) as Detail;

          return new DetailDVO(detail);
        } catch (error) {
          throw new Error(error);
        }
      },
    };
  }
);
