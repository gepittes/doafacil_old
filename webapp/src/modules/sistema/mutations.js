import * as types from './types';

export const mutations = {
    [types.OBTER_SISTEMAS](state, sistema) {
        state.sistema = sistema;
    },
    [types.ACRESCENTAR_SISTEMA](state, sistema) {
        state.sistema.push(sistema);
    },
    [types.DELETE_SISTEMA](state, sistema_id) {
        const index = state.sistema.findIndex(sistema => sistema.sistema_id === sistema_id);
        state.sistema.splice(index, 1);
    },
    [types.ATUALIZAR_SISTEMA](state, sistema_editada) {
        const index = state.sistema.findIndex(sistema => sistema.sistema_id === sistema_editada.sistema_id);
        Object.assign(state.sistema[index], sistema_editada);
    },
};
