import { Image } from "./image";
import { Section } from "./section";

export interface Detail {
  id: number;
  title: string;
  description: string;
  layoutType: string;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  section?: Section;
  images?: Image[];
}

export class DetailDVO {
  id: number;
  title: string;
  description: string;
  layoutType: string;
  section?: Section;
  images?: Image[];

  constructor(data: Detail) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.layoutType = data.layoutType;
    this.section = data.section;
    this.images = data.images;
  }
}

export interface DetailDTO {
  id?: number;
  title: string;
  description: string;
  layoutType: string;
  publishedAt?: Date;
  section?: Section;
  images?: Image[];
}

export enum DetailType {
  PICTURE_LEFT = "Picture Left",
  PICTURE_RIGHT = "Picture Right",
  PICTURE_MIDDLE = "Picture Middle",
  THREE_PICTURE = "Three Picture",
}
