/**
 * user-app service
 */

import { factories } from "@strapi/strapi";
import { QueryParams } from "../../../utils/interface";
import {
  UserApp,
  UserAppDVO,
  UserAppCreate,
} from "../../../../types/collections/user-app";

export default factories.createCoreService(
  "api::user-app.user-app",
  ({ strapi }) => {
    return {
      async getManyUserApp(params: QueryParams): Promise<UserAppDVO[]> {
        try {
          const users = (await strapi
            .query("api::user-app.user-app")
            .findMany(params)) as UserApp[];

          if (users.length === 0) {
            return [];
          }

          return users.map((user) => new UserAppDVO(user as UserApp));
        } catch (error) {
          throw new Error(error);
        }
      },

      async getOneUserApp(params: QueryParams): Promise<UserAppDVO> {
        try {
          const user = (await strapi
            .query("api::user-app.user-app")
            .findOne(params)) as UserApp;

          if (!user) {
            return null;
          }

          return new UserAppDVO(user);
        } catch (error) {
          throw new Error(error);
        }
      },

      async postUserApp(payload: UserAppCreate): Promise<UserAppDVO> {
        try {
          const user = (await strapi.entityService.create(
            "api::user-app.user-app",
            { data: payload }
          )) as UserApp;

          return new UserAppDVO(user);
        } catch (error) {
          throw new Error(error);
        }
      },

      async putUserApp(payload: UserApp): Promise<UserAppDVO> {
        try {
          const user = (await strapi.entityService.update(
            "api::user-app.user-app",
            payload.id,
            { data: payload }
          )) as UserApp;

          return new UserAppDVO(user);
        } catch (error) {
          throw new Error(error);
        }
      },
    };
  }
);
