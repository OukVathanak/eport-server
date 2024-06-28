/**
 * social service
 */

import { factories } from "@strapi/strapi";
import {
  Social,
  SocialDTO,
  SocialDVO,
  SocialQueryParams,
} from "../../../../types/collections/social";

export default factories.createCoreService(
  "api::social.social",
  ({ strapi }) => {
    return {
      async getManySocial(params: SocialQueryParams): Promise<SocialDVO[]> {
        try {
          const socials = (await strapi
            .query("api::social.social")
            .findMany(params)) as Social[];

          if (socials.length === 0) {
            return [];
          }

          return socials.map((social) => new SocialDVO(social as Social));
        } catch (error) {
          throw new Error(error);
        }
      },

      async getOneSocial(params: SocialQueryParams): Promise<SocialDVO> {
        try {
          const social = (await strapi
            .query("api::social.social")
            .findOne(params)) as Social;

          if (!social) {
            return null;
          }

          return new SocialDVO(social);
        } catch (error) {
          throw new Error(error);
        }
      },

      async postSocial(payload: SocialDTO) {
        try {
          const social = (await strapi.entityService.create(
            "api::social.social",
            { data: payload }
          )) as Social;

          return new SocialDVO(social);
        } catch (error) {
          throw new Error(error);
        }
      },

      async putSocial(payload: SocialDTO) {
        try {
          const social = (await strapi.entityService.update(
            "api::social.social",
            payload.id,
            { data: payload }
          )) as Social;

          return new SocialDVO(social);
        } catch (error) {
          throw new Error(error);
        }
      },
    };
  }
);
