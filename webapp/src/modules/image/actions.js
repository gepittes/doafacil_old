import axios from "axios";
import * as types from "./types";

export const uploadImage = ({ dispatch, commit }, objeto) => {
  axios
    .post("http://localhost/v1/image", objeto)
    .then(response => {
      const { data } = response;
      commit(types.UPLOAD_IMAGE, data.data);
      dispatch("alert/success", "Imagem atualizada com sucesso!", {
        root: true
      });
    })
    .catch(error => {
      console.log(error);

      dispatch("alert/error", error.response.data.error, {
        root: true
      });
    });
};
