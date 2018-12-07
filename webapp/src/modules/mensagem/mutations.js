import * as types from './types';

export const mutations = {
    [types.DEFINIR_MENSAGEM](state, mensagem) {
        state.mensagem = mensagem
    },
    [types.DELETE_MENSAGEM](state, mensagem_id) {
        var index = state.mensagem.findIndex(mensagem => mensagem.mensagem_id === mensagem_id);
        state.mensagem.splice(index, 1);
    },
    [types.ATUALIZAR_MENSAGEM](state, mensagem_editada) {
        var index = state.mensagem.findIndex(mensagem => mensagem.mensagem_id === mensagem_editada.mensagem_id);
        Object.assign(state.mensagem[index], mensagem_editada)
    },
}
