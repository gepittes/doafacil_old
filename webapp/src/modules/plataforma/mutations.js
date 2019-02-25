import * as types from './types';

export const state = {
    plataforma: {}
}

export const mutations = {
    [types.SET_PLATAFORMA](state, plataforma) {
        state.plataforma = plataforma
    },
    [types.DELETE_PLATAFORMA](state, plataforma_id) {
        var index = state.plataforma.findIndex(plataforma => plataforma.plataforma_id === plataforma_id);
        state.plataforma.splice(index, 1);
    },
    [types.ATUALIZAR_PLATAFORMA](state, plataforma_editada) {
        var index = state.plataforma.findIndex(plataforma => plataforma.plataforma_id === plataforma_editada.plataforma_id);
        Object.assign(state.plataforma[index], plataforma_editada)
    },
}
