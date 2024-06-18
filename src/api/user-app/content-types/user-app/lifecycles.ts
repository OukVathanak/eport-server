import { HomePageDTO } from "../../../../../types/collections/home-page";
import { UserApp } from "../../../../../types/collections/user-app";
import { hashPassword } from "../../../../utils/helpers";
import { QueryParams } from "../../../../utils/interface";

export default {
  async beforeCreate(event) {
    // Hash password
    if (event.params.data.password) {
      event.params.data.password = await hashPassword(
        event.params.data.password
      );
    }
  },

  async beforeUpdate(event) {
    if (event.params.data.password) {
      const queryParams: QueryParams = {
        where: { id: { $eq: event.params.data.id } },
      };

      const user: UserApp = await strapi
        .service("api::user-app.user-app")
        .getOneUserApp(queryParams);

      if (event.params.data.password != user.password) {
        event.params.data.password = await hashPassword(
          event.params.data.password
        );
      }
    }
  },

  async afterCreate(event) {
    // Create home page and attach it to user
    if (event.result) {
      const homepagePayload: HomePageDTO = {
        userApp: event.result.id,
      };

      await strapi
        .service("api::home-page.home-page")
        .postHomePage(homepagePayload);
    }
  },
};
