import { Project } from "./project";
import { UserApp } from "./user-app";

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
  heroTitle: string;
  heroDescription: string;
  heroImageUrl: string;
  publishedAt?: Date;
  userApp?: UserApp;
  projects?: Project[];
}
