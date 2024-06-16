import { Context, Next } from "koa";
import { APIResponse, HTTPCode, createErrorResponse } from "../utils/response";
import { Session } from "../../types/collections/session";
import { DecodedJWT, JWTService, JWTVerifyStatus } from "../utils/jwt-service";

const authentication = () => {
  return async (ctx: Context, next: Next) => {
    // Get the Authorization header
    const authHeader = ctx.request.header.authorization;

    // Check if the header exists and starts with 'Bearer'
    if (authHeader && authHeader.startsWith("Bearer ")) {
      // Extract the token from the header
      const token = authHeader.split(" ")[1];

      try {
        // Verify the JWT
        const decodedToken: DecodedJWT = JWTService.validateJWT(token);

        if (
          decodedToken.status == JWTVerifyStatus.EXPIRED ||
          decodedToken.status == JWTVerifyStatus.INVALID
        ) {
          const response: APIResponse = createErrorResponse(
            HTTPCode.UNAUTHORIZE
          );
          ctx.throw(response.statusCode, response.error);
        }

        // Verify if session is active
        const findSession: Session = await strapi
          .service("api::session.session")
          .getOneSession({
            where: { sessionToken: { $eq: decodedToken.jwt.sessionToken } },
          });

        if (findSession && !findSession.isActive) {
          const response = createErrorResponse(HTTPCode.UNAUTHORIZE);
          ctx.throw(response.status, response.error);
        }

        // Attach the decoded token to the context for future use
        ctx.state.user = decodedToken.jwt.user;

        await next();
      } catch (error) {
        // If token verification fails, return 401 Unauthorized
        ctx.throw(error);
      }
    } else {
      // If Authorization header is missing or doesn't start with 'Bearer', return 401 Unauthorized
      const response = createErrorResponse(HTTPCode.UNAUTHORIZE);
      ctx.throw(response.statusCode, response.error);
    }
  };
};

export default authentication;
