import { QueryParams } from "../../src/utils/query-params";
import { UserApp } from "./user-app";

export interface Social {
  id: number;
  name: string;
  link: string;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  userApp?: UserApp;
}

export interface SocialQueryParams extends QueryParams<Social> {}

export class SocialDVO {
  id: number;
  name: string;
  link: string;
  userApp?: UserApp;

  constructor(data: Social) {
    this.id = data.id;
    this.name = data.name;
    this.link = data.link;
    this.userApp = data.userApp;
  }
}

export interface SocialDTO {
  id?: number;
  name: string;
  link: string;
  publishedAt?: Date;
  userApp?: UserApp;
}
