/**
 * skill service
 */

import { factories } from "@strapi/strapi";
import { Skill, SkillDTO, SkillDVO, SkillQueryParams } from "../../../../types/collections/skill";

export default factories.createCoreService("api::skill.skill", ({ strapi }) => {
  return {
    async getManySkill(params: SkillQueryParams): Promise<SkillDVO[]> {
      try {
        const skills = (await strapi
          .query("api::skill.skill")
          .findMany(params)) as Skill[];

        if (skills.length === 0) {
          return [];
        }

        return skills.map((skill) => new SkillDVO(skill));
      } catch (error) {
        throw new Error(error);
      }
    },

    async getOneSkill(params: SkillQueryParams): Promise<SkillDVO> {
      try {
        const skill = (await strapi
          .query("api::skill.skill")
          .findOne(params)) as Skill;

        if (!skill) {
          null;
        }

        return new SkillDVO(skill);
      } catch (error) {
        throw new Error(error);
      }
    },

    async postSkill(payload: SkillDTO): Promise<SkillDVO> {
      try {
        const skill = (await strapi.entityService.create("api::skill.skill", {
          data: payload,
        })) as Skill;

        return new SkillDVO(skill);
      } catch (error) {
        throw Error(error);
      }
    },

    async putSkill(payload: SkillDTO): Promise<SkillDVO> {
      try {
        const skill = (await strapi.entityService.update(
          "api::skill.skill",
          payload.id,
          {
            data: payload,
          }
        )) as Skill;

        return new SkillDVO(skill);
      } catch (error) {
        throw Error(error);
      }
    },
  };
});
