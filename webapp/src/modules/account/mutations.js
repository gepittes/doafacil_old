import * as types from './types';

export default {
    [types.LOGINREQUEST](state, token) {
        state.status = { loggingIn: true };
        state.token = token;
    },
    [types.LOGINSUCCESS](state, token) {
        localStorage.setItem('token', token);
        state.status = { loggedIn: true };
        state.token = token;
    },
    [types.SETACCOUNTINFO](state, accountInfo) {
        state.accountInfo = accountInfo;
    },
    [types.LOGINFAILURE](state) {
        state.status = {};
        state.token = null;
    },
    [types.LOGOUT](state) {
        state.status = {};
        state.token = null;
        state.accountInfo = null;
        state.message = null;
        state.message_type = null;
    },
    [types.REGISTERREQUEST](state) {
        state.status = { registering: true };
    },
    [types.REGISTERSUCCESS](state) {
        state.status = {};
    },
    [types.REGISTERFAILURE](state) {
        state.status = {};
    },
};
