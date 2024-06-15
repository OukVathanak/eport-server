import { UserApp } from "./user-app";

export interface Skill {
  id: number;
  name: string;
  iconUrl: string;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  userApp?: UserApp;
}

export class SkillDVO {
  id: number;
  name: string;
  iconUrl: string;
  userApp?: UserApp;

  constructor(data: Skill) {
    this.id = data.id;
    this.name = data.name;
    this.iconUrl = data.iconUrl;
    this.userApp = data.userApp;
  }
}

export interface SkillDTO {
  id?: number;
  name: string;
  iconUrl?: string;
  userApp?: UserApp;
  publishedAt?: Date;
}
