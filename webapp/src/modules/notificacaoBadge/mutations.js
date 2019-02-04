import * as types from './types';

export const mutations = {
  [types.DEFINIR_NOTIFICACOES_BADGE](state, notificacoesBadge) {
    state.notificacoesBadge = notificacoesBadge;
  },
};
