import * as types from './types';

export default {
  [types.GETALLREQUEST](state) {
    state.all = { loading: true };
  },
  [types.GETALLSUCCESS](state, users) {
    state.all = { items: users };
  },
  [types.GETALLFAILURE](state, error) {
    state.all = { error };
  },
  [types.DELETEREQUEST](state, id) {
    state.all.items = state.all.items.map(user =>
      (user.id === id
        ? { ...user, deleting: true }
        : user));
  },
  [types.DELETESUCCESS](state, id) {
    state.all.items = state.all.items.filter(user => user.id !== id);
  },
  [types.DELETEFAILURE](state, { id, error }) {
    state.all.items = state.items.map((user) => {
      if (user.id === id) {
        const { deleting, ...userCopy } = user;
        return { ...userCopy, deleteError: error };
      }

      return user;
    });
  },
};
