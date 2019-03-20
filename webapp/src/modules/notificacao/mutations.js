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
        const notificacoesNaoLidas = [];
        Object.keys(notificacoesBadge).forEach((indice) => {
            const isNotificacaoNaoLida = [
                '',
                null,
                false,
            ].includes(notificacoesBadge[indice].is_notificacao_lida);

            if (isNotificacaoNaoLida) {
                notificacoesNaoLidas.push(notificacoesBadge[indice]);
            }
        });
        state.notificacoesBadge = notificacoesNaoLidas;
    },
    [types.ATUALIZAR_NOTIFICACAO_BADGE](state, notificacaoEditada) {
        const index = state.notificacoesBadge.findIndex(notificacao => notificacao.notificacao_id === notificacaoEditada.notificacao_id);
        Object.assign(state.notificacoesBadge[index], notificacaoEditada);
    },
    [types.ACRESCENTAR_NOTIFICACAO_BADGE](state, notificacao) {
        state.notificacoesBadge.push(notificacao);
    },
    [types.REMOVER_NOTIFICACAO_BADGE](state, notificacaoId) {
        const index = state.notificacoesBadge.findIndex(notificacao => notificacao.notificacao_id === notificacaoId);
        state.notificacoesBadge.splice(index, 1);
    },
};
