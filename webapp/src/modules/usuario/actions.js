import {userService} from './service';

export const obterTodos = ({commit}) => {
    commit('getAllRequest');

    userService.getAll()
        .then(
            users => commit('OBTER_TODAS_SUCESSO', users),
            error => commit('OBTER_TODOS_ERRO', error)
        );
};

export const remover = ({commit}, id) => {
    commit('deleteRequest', id);

    userService.delete(id)
        .then(
            user => commit('REMOVER_SUCESSO', id),
            error => commit('REMOVER_SUCESSO', {
                id, error: error.toString()
            })
        );
}
