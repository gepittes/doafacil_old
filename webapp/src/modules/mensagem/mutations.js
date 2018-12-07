import * as types from './types';

export const mutations = {
    [types.DEFINIR_MENSAGENS](state, mensagens) {
        state.mensagens = mensagens
    },
    [types.ACRESCENTAR_MENSAGEM](state, mensagem) {
        state.mensagens.push(mensagem);
    },
    [types.REMOVER_MENSAGEM](state, mensagem_id) {
        var index = state.mensagens.findIndex(mensagem => mensagem.mensagem_id === mensagem_id);
        state.mensagens.splice(index, 1);
    },
    [types.ATUALIZAR_MENSAGEM](state, mensagem_editada) {
        var index = state.mensagens.findIndex(mensagem => mensagem.mensagem_id === mensagem_editada.mensagem_id);
        Object.assign(state.mensagens[index], mensagem_editada)
    },
}
