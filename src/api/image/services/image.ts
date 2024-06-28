/**
 * image service
 */

import { factories } from "@strapi/strapi";
import { Image, ImageDTO, ImageDVO, ImageQueryParams } from "../../../../types/collections/image";

export default factories.createCoreService("api::image.image", ({ strapi }) => {
  return {
    async getManyImage(params: ImageQueryParams): Promise<ImageDVO[]> {
      try {
        const images = (await strapi
          .query("api::image.image")
          .findMany(params)) as Image[];

        if (images.length === 0) {
          return [];
        }

        return images.map((image) => new ImageDVO(image as Image));
      } catch (error) {
        throw new Error(error);
      }
    },

    async getOneImage(params: ImageQueryParams): Promise<ImageDVO> {
      try {
        const image = (await strapi
          .query("api::image.image")
          .findOne(params)) as Image;

        if (!image) {
          return null;
        }

        return new ImageDVO(image);
      } catch (error) {
        throw new Error(error);
      }
    },

    async postImage(payload: ImageDTO): Promise<ImageDVO> {
      try {
        const image = (await strapi.entityService.create("api::image.image", {
          data: payload,
        })) as Image;

        return new ImageDVO(image);
      } catch (error) {
        throw new Error(error);
      }
    },

    async putImage(payload: ImageDTO): Promise<ImageDVO> {
      try {
        const image = (await strapi.entityService.update(
          "api::image.image",
          payload.id,
          {
            data: payload,
          }
        )) as Image;

        return new ImageDVO(image);
      } catch (error) {
        throw new Error(error);
      }
    },
  };
});
