import * as types from './types';

export const mutations = {
    [types.SET_SISTEMA](state, sistema) {
        state.sistema = sistema
    },
    [types.DELETE_SISTEMA](state, sistema_id) {
        var index = state.sistema.findIndex(sistema => sistema.sistema_id === sistema_id);
        state.sistema.splice(index, 1);
    },
    [types.ATUALIZAR_SISTEMA](state, sistema_editada) {
        var index = state.sistema.findIndex(sistema => sistema.sistema_id === sistema_editada.sistema_id);
        Object.assign(state.sistema[index], sistema_editada)
    },
}
