import * as types from './types';

export const mutations = {
    [types.DEFINIR_MENSAGENS](state, mensagens) {
        state.mensagens = mensagens;
    },
    [types.ACRESCENTAR_MENSAGEM](state, mensagem) {
        state.mensagens.push(mensagem);
    },
    [types.REMOVER_MENSAGEM](state, mensagemId) {
        const index = state.mensagens.findIndex(mensagem => mensagem.mensagem_id === mensagemId);
        state.mensagens.splice(index, 1);
    },
    [types.ATUALIZAR_MENSAGEM](state, mensagemEditada) {
        const index = state.mensagens.findIndex(mensagem => mensagem.mensagem_id === mensagemEditada.mensagem_id);
        Object.assign(state.mensagens[index], mensagemEditada);
    },
};
