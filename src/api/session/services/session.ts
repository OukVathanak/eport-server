/**
 * session service
 */

import { factories } from "@strapi/strapi";
import { QueryParams } from "../../../utils/interface";
import {
  Session,
  SessionDTO,
  SessionDVO,
} from "../../../../types/collections/session";
import { UserApp } from "../../../../types/collections/user-app";
import { extractDateFromString, generateToken } from "../../../utils/helpers";
require("dotenv");

export default factories.createCoreService(
  "api::session.session",
  ({ strapi }) => {
    return {
      async getManySession(params: QueryParams): Promise<SessionDVO[]> {
        try {
          const sessions = (await strapi
            .query("api::session.session")
            .findMany(params)) as Session[];

          if (sessions.length === 0) {
            return [];
          }

          return sessions.map((session) => new SessionDVO(session as Session));
        } catch (error) {
          throw new Error(error);
        }
      },

      async getOneSession(params: QueryParams): Promise<SessionDVO> {
        try {
          const session = (await strapi
            .query("api::session.session")
            .findOne(params)) as Session;

          if (!session) {
            return null;
          }

          return new SessionDVO(session);
        } catch (error) {
          throw new Error(error);
        }
      },

      async postSession(user: UserApp): Promise<SessionDVO> {
        try {
          const sessionPayload: SessionDTO = {
            token: generateToken(),
            expiredAt: extractDateFromString(process.env.SESSION_DURATION),
            isActive: true,
            publishedAt: new Date(),
            userApp: user,
          };

          const session = (await strapi.entityService.create(
            "api::session.session",
            { data: sessionPayload }
          )) as Session;

          return new SessionDVO(session);
        } catch (error) {
          throw new Error(error);
        }
      },

      async putSession(payload: SessionDTO): Promise<SessionDVO> {
        try {
          const session = (await strapi.entityService.update(
            "api::session.session",
            payload.id,
            { data: payload }
          )) as Session;

          return new SessionDVO(session);
        } catch (error) {
          throw new Error(error);
        }
      },
    };
  }
);
