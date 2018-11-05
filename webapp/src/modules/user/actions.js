import {userService} from '../user/service';
import {router} from '../_helpers';

export const getAll = ({ commit }) => {
    commit('GETALLREQUEST');

    userService.getAll()
        .then(
            users => commit('GETALLSUCCESS', users),
            error => commit('GETALLFAILURE', error)
        );
}

export const _delete = ({ commit }, id) => {
    commit('DELETEREQUEST', id);

    userService.delete(id)
        .then(
            user => commit('DELETESUCCESS', id),
            error => commit('DELETESUCCESS', { id, error: error.toString() })
        );
}
