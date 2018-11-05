import * as types from './types';

export default {
    [types.GETALLREQUEST](state) {
        state.all = { loading: true };
    },
    [types.SUCCESS](state, message) {
        state.type = 'alert-success';
        state.message = message;
    },
    [types.ERROR](state, message) {
        state.type = 'alert-danger';
        state.message = message;
    },
    [types.CLEAR](state) {
        state.type = null;
        state.message = null;
    }
}
