import { Section } from "./section";
import { UserApp } from "./user-app";

export interface Project {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  status: string;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  userApp?: UserApp;
  sections?: Section[];
}

export class ProjectDVO {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  status: string;
  publishedAt?: Date;
  userApp?: UserApp;
  sections?: Section[];

  constructor(data: Project) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.imageUrl = data.imageUrl;
    this.status = data.status;
    this.publishedAt = data.publishedAt;
    this.userApp = data.userApp;
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
  userApp?: UserApp;
  sections?: Section[];
}

export enum ProjectStatus {
  IN_PROGRESS = "In Progress",
  COMPLETE = "Complete",
}
