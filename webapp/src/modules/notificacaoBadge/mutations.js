import * as types from './types';

export const mutations = {
  [types.DEFINIR_NOTIFICACOES_BADGE](state, notificacoesBadge) {
    state.notificacoesBadge = notificacoesBadge;
  },
  [types.ACRESCENTAR_NOTIFICACAO_BAGDE](state, notificacaoBadge) {
    state.notificacoesBadge.push(notificacaoBadge);
  },
  [types.REMOVER_NOTIFICACAO_BAGDE](state, notificacaoId) {
    const index = state.notificacoesBadge.findIndex(notificacaoBadge => notificacaoBadge.notificacao_id === notificacaoId);
    state.notificacoesBadge.splice(index, 1);
  },
  [types.ATUALIZAR_NOTIFICACAO_BAGDE](state, notificacaoEditada) {
    const index = state.notificacoesBadge.findIndex(notificacaoBadge => notificacaoBadge.notificacao_id === notificacaoEditada.notificacao_id);
    Object.assign(state.notificacoesBadge[index], notificacaoEditada);
  },
};
