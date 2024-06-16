import { Contributor } from "./contributor";
import { Detail } from "./detail";
import { Project } from "./project";

export interface Section {
  id: number;
  type: string;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  project?: Project;
  contributors?: Contributor[];
  details?: Detail[];
}

export class SectionDVO {
  id: number;
  type: string;
  project?: Project;
  contributors?: Contributor[];
  details?: Detail[];

  constructor(data: Section) {
    this.id = data.id;
    this.type = data.type;
    this.project = data.project;
    this.contributors = data.contributors;
    this.details = data.details;
  }
}

export interface SectionDTO {
  id?: number;
  type: string;
  publishedAt?: Date;
  project?: Project;
  contributors?: Contributor[];
  details?: Detail[];
}

export enum SectionType {
  CONTRIBUTOR = "Contributor",
  DETAIL = "Detail",
}
