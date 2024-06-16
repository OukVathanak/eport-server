import jwt from "jsonwebtoken";
import { UserApp } from "../../types/collections/user-app";
require("dotenv");

export interface JWTPaylod {
  user: UserApp;
  sessionToken: string;
}

export interface DecodedJWT {
  status: JWTVerifyStatus;
  jwt: JWTPaylod | null;
}

export enum JWTVerifyStatus {
  VALID = "valid",
  EXPIRED = "expired",
  INVALID = "invalid",
}

export class JWTService {
  private static secret: string = process.env.JWT_SECRET || "defaultSecret";
  private static duration: string = process.env.JWT_DURATION || "1h";

  // ---------- Generate JWT token ----------
  static generateJWT(payload: JWTPaylod): string {
    return jwt.sign(payload, this.secret, {
      expiresIn: this.duration,
    }) as string;
  }

  // ---------- Validate JWT token ----------
  static validateJWT(token: string): DecodedJWT {
    let decodedToken: JWTPaylod | null = null;
    let isTokenValid: JWTVerifyStatus = JWTVerifyStatus.VALID;

    try {
      // Verify if token is valid
      decodedToken = jwt.verify(token, this.secret) as JWTPaylod;
    } catch (error) {
      // Check if token is expired
      if (error instanceof jwt.TokenExpiredError) {
        isTokenValid = JWTVerifyStatus.EXPIRED;
        decodedToken = jwt.decode(token) as JWTPaylod;
      } else {
        // If token not expired then its invalid
        isTokenValid = JWTVerifyStatus.INVALID;
      }
    }

    return { status: isTokenValid, jwt: decodedToken };
  }
}
