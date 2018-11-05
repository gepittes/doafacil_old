import {userService} from '../user/service';
import {router} from '../_helpers';

export const getAll = ({ commit }) => {
    commit('getAllRequest');

    userService.getAll()
        .then(
            users => commit('getAllSuccess', users),
            error => commit('getAllFailure', error)
        );
}

export const _delete = ({ commit }, id) => {
    commit('deleteRequest', id);

    userService.delete(id)
        .then(
            user => commit('deleteSuccess', id),
            error => commit('deleteSuccess', { id, error: error.toString() })
        );
}
