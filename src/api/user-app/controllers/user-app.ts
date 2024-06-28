/**
 * user-app controller
 */

import { factories } from "@strapi/strapi";
import { LoginDTO } from "../../../../types/requests/login";
import { UserApp, UserAppQueryParams } from "../../../../types/collections/user-app";
import {
  APIResponse,
  HTTPCode,
  createErrorResponse,
  createSuccessResponse,
} from "../../../utils/response";
import { validatePassword } from "../../../utils/helpers";
import { Session } from "../../../../types/collections/session";
import { JWTPaylod, JWTService } from "../../../utils/jwt-service";

export default factories.createCoreController(
  "api::user-app.user-app",
  ({ strapi }) => {
    return {
      async login(ctx) {
        try {
          // Get request body
          const requestBody: LoginDTO = ctx.request.body;

          // User query params
          const userQueryParams: UserAppQueryParams = {
            where: {
              $or: [
                { username: { $eq: requestBody.identifier } },
                { email: { $eq: requestBody.identifier } },
              ],
            },
          };

          // Find user
          const findUser: UserApp = await strapi
            .service("api::user-app.user-app")
            .getOneUserApp(userQueryParams);

          // Check if user exist
          if (!findUser) {
            const response: APIResponse = createErrorResponse(
              HTTPCode.UNAUTHORIZE
            );
            ctx.throw(response.statusCode, "Invalid credentials");
          }

          // Validate password
          const isPasswordValid: boolean = await validatePassword(
            requestBody.password,
            findUser.password
          );
          if (!isPasswordValid) {
            const response: APIResponse = createErrorResponse(
              HTTPCode.UNAUTHORIZE
            );
            ctx.throw(response.statusCode, "Invalid credentials");
          }

          // Create session
          const sessionCreate: Session = await strapi
            .service("api::session.session")
            .postSession(findUser);

          // Create jwt payload
          const jwtPayload: JWTPaylod = {
            sessionToken: sessionCreate.token,
            user: findUser,
          };

          // Create jwt token (access token)
          const jwt: string = JWTService.generateJWT(jwtPayload);

          // Respnose
          const response: APIResponse = createSuccessResponse(
            HTTPCode.SUCCESS,
            { token: jwt }
          );
          ctx.send(response, response.statusCode);
        } catch (error) {
          ctx.throw(error.statusCode, error.message);
        }
      },
    };
  }
);
