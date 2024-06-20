import { Section } from "./section";
import { UserApp } from "./user-app";

export interface Project {
  id: number;
  order: number;
  name: string;
  description: string;
  imageUrl: string;
  status: ProjectStatus;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  userApp?: UserApp;
  sections?: Section[];
}

export class ProjectDVO {
  id: number;
  order: number;
  name: string;
  description: string;
  imageUrl: string;
  status: ProjectStatus;
  publishedAt?: Date;
  userApp?: UserApp;
  sections?: Section[];

  constructor(data: Project) {
    this.id = data.id;
    this.order = data.order;
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
  order: number;
  name: string;
  description: string;
  imageUrl: string;
  status: ProjectStatus;
  publishedAt?: Date;
  userApp?: UserApp | number;
  sections?: Section[];
}

export enum ProjectStatus {
  IN_PROGRESS = "In Progress",
  COMPLETE = "Complete",
}
