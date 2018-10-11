import * as types from './types';

export const state = {
    plataforma: {}
}

export const mutations = {
    [types.SET_PLATAFORMA](state, plataforma) {
        state.plataforma = plataforma
    }
}
