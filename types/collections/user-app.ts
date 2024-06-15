export interface UserApp {
  id: number;
  username: string;
  password: string;
  email: string;
  isHidden: boolean;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export class UserAppDVO {
  id: number;
  username: string;
  password: string;
  email: string;
  isHidden: boolean;

  constructor(data: UserApp) {
    this.id = data.id;
    this.username = data.username;
    this.password = data.password;
    this.email = data.email;
    this.isHidden = data.isHidden;
  }
}

export interface UserAppCreate {
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
