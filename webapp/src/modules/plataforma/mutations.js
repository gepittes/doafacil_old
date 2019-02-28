import * as types from './types';

export const mutations = {
    [types.SET_PLATAFORMA](state, plataforma) {
        state.plataforma = plataforma;
    },
    [types.DELETE_PLATAFORMA](state, plataformaId) {
        const index = state.plataforma.findIndex(plataforma => plataforma.plataforma_id === plataformaId);
        state.plataforma.splice(index, 1);
    },
    [types.ATUALIZAR_PLATAFORMA](state, plataformaEditada) {
        const index = state.plataforma.findIndex(plataforma => plataforma.plataforma_id === plataformaEditada.plataforma_id);
        Object.assign(state.plataforma[index], plataformaEditada);
    },
    [types.ACRESCENTAR_PLATAFORMA](state, plataforma) {
        state.plataforma.push(plataforma);
    },
};
