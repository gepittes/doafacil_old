import * as types from './types';

export default {
  [types.GETALLREQUEST](state) {
    state.all = { loading: true };
  },
  [types.SUCCESS](state, message) {
    state.message_type = 'success';
    state.message = message;
  },
  [types.ERROR](state, message) {
    state.message_type = 'error';
    state.message = message;
  },
  [types.INFO](state, message) {
    state.message_type = 'info';
    state.message = message;
  },
  [types.CLEAR](state) {
    state.message_type = null;
    state.message = null;
  },
};
