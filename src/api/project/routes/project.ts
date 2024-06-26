/**
 * project router
 */

import { config } from "dotenv";
import auth from "../../../middlewares/auth";
import validateRequest from "../../../middlewares/request-validation";
import middlewares from "../../../../config/middlewares";

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
    {
      method: "GET",
      path: "/projects",
      handler: "project.allProject",
      config: {
        auth: false,
        middlewares: [auth()],
      },
    },
    {
      method: "POST",
      path: "/projects",
      handler: "project.createProject",
      config: {
        auth: false,
        middlewares: [auth()],
      },
    },
    {
      method: "PUT",
      path: "/project/:id",
      handler: "project.updateProject",
      config: {
        auth: false,
        middlewares: [auth()],
      },
    },
    {
      method: "DELETE",
      path: "/project/:id",
      handler: "project.deleteProject",
      config: {
        auth: false,
        middlewares: [auth()],
      },
    },
  ],
};
