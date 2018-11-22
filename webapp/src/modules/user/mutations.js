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
        // add 'deleting:true' property to user being deleted
        state.all.items = state.all.items.map(user =>
            user.id === id
                ? { ...user, deleting: true }
                : user
        )
    },
    [types.DELETESUCCESS](state, id) {
        // remove deleted user from state
        state.all.items = state.all.items.filter(user => user.id !== id)
    },
    [types.DELETEFAILURE](state, { id, error }) {
        // remove 'deleting:true' property and add 'deleteError:[error]' property to user
        state.all.items = state.items.map(user => {
            if (user.id === id) {
                // make copy of user without 'deleting:true' property
                const { deleting, ...userCopy } = user;
                // return copy of user with 'deleteError:[error]' property
                return { ...userCopy, deleteError: error };
            }

            return user;
        })
    }
}
