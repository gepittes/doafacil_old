import * as types from './types';

export const mutations = {
    [types.OBTER_TODAS_REQUISICAO](state) {
        state.todos = {loading: true};
    },
    [types.OBTER_TODAS_SUCESSO](state, users) {
        state.todos = {items: users};
    },
    [types.OBTER_TODOS_ERRO](state, error) {
        state.todos = {error};
    },
    [types.REMOVER_REQUISICOES](state, id) {
        state.todos.items = state.todos.items.map(user => user.id === id ? {...user, deleting: true} : user)
    },
    [types.REMOVER_SUCESSO](state, id) {
        state.todos.items = state.todos.items.filter(user => user.id !== id)
    },
    [types.REMOVER_ERRO](state, {id, error}) {
        state.todos.items = state.items.map(user => {
            if (user.id === id) {
                const {deleting, ...userCopy} = user;
                return {...userCopy, removerError: error};
            }

            return user;
        })
    }
};
