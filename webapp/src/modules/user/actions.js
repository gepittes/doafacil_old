import { userService } from '../user/service';
import * as types from './types';

export const getAll = ({ dispatch, commit }) => {
    commit(types.GETALLREQUEST);

    userService.getAll()
        .then(
            users => commit(types.GETALLSUCCESS, users),
            error => commit(types.GETALLFAILURE, error),
        ).catch((error) => {
            dispatch('alert/error', error.response.data.error, {
                root: true,
            });
        });
};

export const _delete = ({ dispatch, commit }, id) => {
    commit(types.DELETEREQUEST, id);

    userService.remove(id)
        .then(
            user => commit(types.DELETESUCCESS, id),
            error => commit(types.DELETESUCCESS, { id, error: error.toString() }),
        ).catch((error) => {
            dispatch('alert/error', error.response.data.error, {
                root: true,
            });
        });
};
