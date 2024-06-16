import { Section } from "./section";

export interface Contributor {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  section?: Section;
}

export class ContributorDVO {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  section?: Section;

  constructor(data: Contributor) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.imageUrl = data.imageUrl;
    this.section = data.section;
  }
}

export class ContributorDTO {
  id?: number;
  name: string;
  description: string;
  imageUrl: string;
  publishedAt?: Date;
  section?: Section;
}
