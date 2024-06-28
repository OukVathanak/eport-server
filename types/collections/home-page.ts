 import { UserApp } from "./user-app";
import { QueryParams } from "../../src/utils/query-params";

export interface HomePage {
  id: number;
  heroTitle: string;
  heroDescription: string;
  heroImageUrl: string;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  userApp?: UserApp;
}

export interface HomePageQueryParams extends QueryParams<HomePage> {}

export class HomePageDVO {
  id: number;
  heroTitle: string;
  heroDescription: string;
  heroImageUrl: string;
  userApp?: UserApp;

  constructor(data: HomePage) {
    this.id = data.id;
    this.heroTitle = data.heroTitle;
    this.heroDescription = data.heroDescription;
    this.heroImageUrl = data.heroImageUrl;
    this.userApp = data.userApp;
  }
}

export interface HomePageDTO {
  id?: number;
  heroTitle?: string;
  heroDescription?: string;
  heroImageUrl?: string;
  publishedAt?: Date;
  userApp?: UserApp | number;
}
