import * as types from './types';

export const state = {
    conta: {},
    isLoggedIn: !!localStorage.getItem('token'),
    pending: true
}

export const mutations = {
    [types.DEFINIR_CONTA](state, conta) {
        state.conta = conta
    },
    [types.LOGIN] (state) {
        state.pending = true;
    },
    [types.LOGIN_SUCCESS] (state) {
        state.isLoggedIn = true;
        state.pending = false;
    },
    [types.LOGOUT](state) {
        state.isLoggedIn = false;
    }
}
