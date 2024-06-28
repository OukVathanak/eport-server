import { QueryParams } from "../../src/utils/query-params";
import { Detail } from "./detail";

export interface Image {
  id: number;
  imageUrl: string;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  detail?: Detail;
}

export interface ImageQueryParams extends QueryParams<Image> {}

export class ImageDVO {
  id: number;
  imageUrl: string;
  detail?: Detail;

  constructor(data: Image) {
    this.id = data.id;
    this.imageUrl = data.imageUrl;
    this.detail = data.detail;
  }
}

export class ImageDTO {
  id?: number;
  imageUrl: string;
  publishedAt?: Date;
  detail?: Detail;
}
