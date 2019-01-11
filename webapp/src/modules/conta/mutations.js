import * as types from './types';

export const mutations = {
  [types.SET_CONTA](state, conta) {
    state.conta = conta;
  },
  [types.DELETE_CONTA](state, usuario_id) {
    const index = state.conta.findIndex(conta => conta.usuario_id === usuario_id);
    state.conta.splice(index, 1);
  },
  [types.ATUALIZAR_CONTA](state, conta_editada) {
    const index = state.conta.findIndex(conta => conta.usuario_id === conta_editada.usuario_id);
    Object.assign(state.conta[index], conta_editada);
  },
};
