import { UserApp } from "./user-app";

export interface Skill {
  id: number;
  name: String;
  iconUrl: String;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  userApp?: UserApp;
}

export class SkillDVO {
  id: number;
  name: String;
  iconUrl: String;
  userApp?: UserApp;

  constructor(data: Skill) {
    this.id = data.id;
    this.name = data.name;
    this.iconUrl = data.iconUrl;
    this.userApp = data.userApp;
  }
}

export interface SkillCreate {
  name: String;
  iconUrl: String;
  userApp?: UserApp;
  publishedAt?: Date;
}
