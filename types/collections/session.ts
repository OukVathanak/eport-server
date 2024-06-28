import { QueryParams } from "../../src/utils/query-params";
import { UserApp } from "./user-app";

export interface Session {
  id: number;
  token: string;
  isActive: boolean;
  expiredAt: Date;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  userApp?: UserApp;
}

export interface SessionQueryParams extends QueryParams<Session> {}

export class SessionDVO {
  id: number;
  token: string;
  isActive: boolean;
  expiredAt: Date;
  userApp?: UserApp;

  constructor(data: Session) {
    this.id = data.id;
    this.token = data.token;
    this.isActive = data.isActive;
    this.expiredAt = data.expiredAt;
    this.userApp = data.userApp;
  }
}

export class SessionDTO {
  id?: number;
  token: string;
  isActive: boolean;
  expiredAt: Date;
  publishedAt?: Date;
  userApp?: UserApp;
}
