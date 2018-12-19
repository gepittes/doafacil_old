import * as types from './types';

const segundosDuracaoMensagem = 8;

export const success = ({ dispatch, commit }, message) => {
  commit(types.SUCCESS, message);
  setTimeout(() => (dispatch('alert/clear', message, { root: true })), segundosDuracaoMensagem * 1000);
};
export const error = ({ dispatch, commit }, message) => {
  commit(types.ERROR, message);
  setTimeout(() => (dispatch('alert/clear', message, { root: true })), segundosDuracaoMensagem * 1000);
};
export const clear = ({ commit }, message) => {
  commit(types.CLEAR, message);
};
