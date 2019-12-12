import axios from "axios";
import * as types from "./types";

export const uploadImage = ({ dispatch, commit }, data) => {
  axios.post("http://localhost/v1/image", data).then(response => {
    const { data } = response;
    dispatch("alert/success", data, {
      root: true
    });
  });
};
