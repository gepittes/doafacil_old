import * as types from './types'

export const success = ({commit}, message) => {
    commit(types.SUCCESS, message);
}
export const error = ({commit}, message) => {
    commit(types.ERROR, message);
}
export const clear = ({commit}, message) => {
    commit(types.CLEAR, message);
}
