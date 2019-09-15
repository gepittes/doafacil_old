import * as types from './types';

export const mutations = {
    [types.OBTER_CONTAS](state, conta) {
        state.conta = conta;
    },
    [types.ACRESCENTAR_CONTA](state, conta) {
        state.conta.push(conta);
    },
    [types.DELETE_CONTA](state, usuarioId) {
        const index = state.conta.findIndex(conta => conta.usuario_id === usuarioId);
        state.conta.splice(index, 1);
    },
    [types.ATUALIZAR_CONTA](state, contaEditada) {
        state.user = contaEditada;
    },
};
