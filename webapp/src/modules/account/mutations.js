import * as types from './types';

export default {
    [types.LOGINREQUEST](state, user) {
        state.status = { loggingIn: true };
        state.user = user;
    },
    [types.LOGINSUCCESS](state, user) {
        state.status = { loggedIn: true };
        state.user = user;
    },
    [types.SETACCOUNTINFO](state, accountInfo) {
        state.accountInfo = accountInfo;
    },
    [types.LOGINFAILURE](state) {
        state.status = {};
        state.user = null;
    },
    [types.LOGOUT](state) {
        state.status = {};
        state.user = null;
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
