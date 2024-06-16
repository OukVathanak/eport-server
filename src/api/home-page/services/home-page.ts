/**
 * home-page service
 */

import { factories } from "@strapi/strapi";
import { QueryParams } from "../../../utils/interface";
import {
  HomePage,
  HomePageDTO,
  HomePageDVO,
} from "../../../../types/collections/home-page";

export default factories.createCoreService(
  "api::home-page.home-page",
  ({ strapi }) => {
    return {
      async getOneHomePage(params: QueryParams): Promise<HomePageDVO> {
        try {
          const homePage = (await strapi
            .query("api::home-page.home-page")
            .findOne(params)) as HomePage;

          if (!homePage) {
            return null;
          }

          return new HomePageDVO(homePage);
        } catch (error) {
          throw new Error(error);
        }
      },

      async postHomePage(payload: HomePageDTO): Promise<HomePageDVO> {
        try {
          const homePage = (await strapi.entityService.create(
            "api::home-page.home-page",
            { data: payload }
          )) as HomePage;

          return new HomePageDVO(homePage);
        } catch (error) {
          throw new Error(error);
        }
      },

      async putHomePage(payload: HomePageDTO): Promise<HomePageDVO> {
        try {
          const homePage = (await strapi.entityService.update(
            "api::home-page.home-page",
            payload.id,
            { data: payload }
          )) as HomePage;

          return new HomePageDVO(homePage);
        } catch (error) {
          throw new Error(error);
        }
      },
    };
  }
);
