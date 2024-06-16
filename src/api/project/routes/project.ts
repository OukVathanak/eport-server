/**
 * project router
 */

import validateRequest from "../../../middlewares/request-validation";

// import { factories } from '@strapi/strapi';
// export default factories.createCoreRouter('api::project.project');

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/projects/:id",
      handler: "project.findProject",
      config: {
        auth: false,
        middlewares: [],
      },
    },
  ],
};
