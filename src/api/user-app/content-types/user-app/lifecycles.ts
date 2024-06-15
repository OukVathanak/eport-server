import { hashPassword } from "../../../../utils/helpers";

export default {
  async beforeCreate(event) {
    if (event.params.data.password) {
      event.params.data.password = await hashPassword(
        event.params.data.password
      );
    }
  },

  async beforeUpdate(event) {
    if (event.params.data.password) {
      event.params.data.password = await hashPassword(
        event.params.data.password
      );
    }
  },

  afterCreate(event) {},
};
