import * as types from './types';

export const mutations = {
    [types.ESTADO_PNL_CREATE](state, payload) {
        state.statusPainel = payload
    }
};