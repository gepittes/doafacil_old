import * as types from './types';

export const mutations = {
    [types.DEFINIR_NOTIFICACOES_BADGE](state, notificacoesBadge) {
        state.notificacoesBadge = notificacoesBadge;
    },
    [types.ATUALIZAR_NOTIFICACAO_BADGE](state, notificacaoEditada) {
        const index = state.notificacoesBadge.findIndex(notificacao => notificacao.notificacao_id === notificacaoEditada.notificacao_id);
        Object.assign(state.notificacoesBadge[index], notificacaoEditada);
    },
};
