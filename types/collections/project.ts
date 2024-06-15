import { HomePage } from "./home-page";
import { Section } from "./section";
import { UserApp } from "./user-app";

export interface Project {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  status: string;
  userApp?: UserApp;
  homePage?: HomePage;
  sections?: Section[];
}

export class ProjectDVO {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  status: string;
  userApp?: UserApp;
  homePage?: HomePage;
  sections?: Section[];

  constructor(data: Project) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.imageUrl = data.imageUrl;
    this.status = data.status;
    this.userApp = data.userApp;
    this.homePage = data.homePage;
    this.sections = data.sections;
  }
}

export interface ProjectDTO {
  id?: number;
  name: string;
  description: string;
  imageUrl: string;
  status: string;
  publishedAt?: Date;
}

export enum ProjectStatusEnum {
  IN_PROGESS = "In Progress",
  COMPLETE = "Complete",
}
