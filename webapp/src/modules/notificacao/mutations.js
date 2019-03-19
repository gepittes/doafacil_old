import * as types from './types';

export const mutations = {
    [types.DEFINIR_NOTIFICACOES](state, notificacoes) {
        state.notificacoes = notificacoes;
    },
    [types.ACRESCENTAR_NOTIFICACAO](state, notificacao) {
        state.notificacoes.push(notificacao);
    },
    [types.REMOVER_NOTIFICACAO](state, notificacaoId) {
        const index = state.notificacoes.findIndex(notificacao => notificacao.notificacao_id === notificacaoId);
        state.notificacoes.splice(index, 1);
    },
    [types.ATUALIZAR_NOTIFICACAO](state, notificacaoEditada) {
        const index = state.notificacoes.findIndex(notificacao => notificacao.notificacao_id === notificacaoEditada.notificacao_id);
        Object.assign(state.notificacoes[index], notificacaoEditada);
    },
    [types.DEFINIR_NOTIFICACOES_BADGE](state, notificacoesBadge) {
        state.notificacoesBadge = notificacoesBadge;
    },
    [types.ATUALIZAR_NOTIFICACAO_BADGE](state, notificacaoEditada) {
        const index = state.notificacoesBadge.findIndex(notificacao => notificacao.notificacao_id === notificacaoEditada.notificacao_id);
        Object.assign(state.notificacoesBadge[index], notificacaoEditada);
    },
};
