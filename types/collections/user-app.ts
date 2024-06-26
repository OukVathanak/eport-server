import { QueryParams } from "../../src/utils/query-params";
import { HomePage } from "./home-page";
import { Project } from "./project";
import { Session } from "./session";
import { Skill } from "./skill";
import { Social } from "./social";

export interface UserApp {
  id: number;
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  isHidden: boolean;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  projects?: Project[];
  homePage?: HomePage;
  skills?: Skill[];
  socials?: Social[];
  sessions: Session;
}

export interface UserAppQueryParams extends QueryParams<UserApp> {}

export class UserAppDVO {
  id: number;
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  isHidden: boolean;
  projects?: Project[];
  homePage?: HomePage;
  skills?: Skill[];
  socials?: Social[];
  sessions: Session;

  constructor(data: UserApp) {
    this.id = data.id;
    this.username = data.username;
    this.password = data.password;
    this.email = data.email;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.isHidden = data.isHidden;
    this.projects = data.projects;
    this.homePage = data.homePage;
    this.skills = data.skills;
    this.socials = data.socials;
    this.sessions = data.sessions;
  }
}

export interface UserAppDTO {
  id?: number;
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  isHidden: boolean;
  publishedAt?: Date;
  projects?: Project[];
  homePage?: HomePage;
  skills?: Skill[];
  socials?: Social[];
  sessions: Session;
}
