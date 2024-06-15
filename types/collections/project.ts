export interface Project {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  status: string;
}

export class ProjectDVO {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  status: string;

  constructor(data: Project) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.imageUrl = data.imageUrl;
    this.status = data.status;
  }
}

export interface ProjectCreate {
  name: string;
  description: string;
  imageUrl: string;
  status: string;
  publishedAt?: Date;
}

export enum ProjectStatusEnum {
  inProgess = "In Progress",
  complete = "Complete",
}
