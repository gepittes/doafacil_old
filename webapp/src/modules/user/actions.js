import {userService} from '../user/service';
import {router} from '../_helpers';
import * as types from './types'

export const getAll = ({ commit }) => {
    commit(types.GETALLREQUEST);

    userService.getAll()
        .then(
            users => commit(types.GETALLSUCCESS, users),
            error => commit(types.GETALLFAILURE, error)
        );
}

export const _delete = ({ commit }, id) => {
    commit(types.DELETEREQUEST, id);

    userService.delete(id)
        .then(
            user => commit(types.DELETESUCCESS, id),
            error => commit(types.DELETESUCCESS, { id, error: error.toString() })
        );
}
