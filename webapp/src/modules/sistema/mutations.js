import * as types from './types';

export const mutations = {
    [types.OBTER_SISTEMAS](state, sistema) {
        state.sistema = sistema;
    },
    [types.ACRESCENTAR_SISTEMA](state, sistema) {
        state.sistema.push(sistema);
    },
    [types.DELETE_SISTEMA](state, sistemaId) {
        const index = state.sistema.findIndex(sistema => sistema.sistema_id === sistemaId);
        state.sistema.splice(index, 1);
    },
    [types.ATUALIZAR_SISTEMA](state, sistemaEditada) {
        const index = state.sistema.findIndex(sistema => sistema.sistema_id === sistemaEditada.sistema_id);
        Object.assign(state.sistema[index], sistemaEditada);
    },
};
