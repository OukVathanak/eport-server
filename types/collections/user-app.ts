import { HomePage } from "./home-page";
import { Project } from "./project";
import { Skill } from "./skill";
import { Social } from "./social";

export interface UserApp {
  id: number;
  username: string;
  password: string;
  email: string;
  isHidden: boolean;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  projects?: Project[];
  homePage?: HomePage;
  skills?: Skill[];
  socials?: Social[];
}

export class UserAppDVO {
  id: number;
  username: string;
  password: string;
  email: string;
  isHidden: boolean;
  projects?: Project[];
  homePage?: HomePage;
  skills?: Skill[];
  socials?: Social[];

  constructor(data: UserApp) {
    this.id = data.id;
    this.username = data.username;
    this.password = data.password;
    this.email = data.email;
    this.isHidden = data.isHidden;
    this.projects = data.projects;
    this.homePage = data.homePage;
    this.skills = data.skills;
    this.socials = data.socials;
  }
}

export interface UserAppDTO {
  id?: number;
  username: string;
  password: string;
  email: string;
  isHidden: boolean;
  publishedAt?: Date;
}

// export const createUserApp = async (
//   payload: UserAppPayload
// ): Promise<UserAppDVO> => {
//   try {
//   } catch (error) {
//     throw new Error(error);
//   }
// };
