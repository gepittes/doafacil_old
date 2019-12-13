import * as types from "./types";
import { object } from "./getters";

export const mutations = {
  [types.UPLOAD_IMAGE](state, object) {
    state.object = object;
  }
};
