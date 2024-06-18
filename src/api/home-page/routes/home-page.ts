/**
 * home-page router
 */

import { factories } from "@strapi/strapi";

// export default factories.createCoreRouter('api::home-page.home-page');

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/home-page/:username",
      handler: "home-page.findHomePage",
      config: {
        auth: false,
        middlewares: [],
      },
    },
  ],
};
