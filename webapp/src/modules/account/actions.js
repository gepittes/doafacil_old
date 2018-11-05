import {userService} from '../user/service';
import {router} from '../_helpers';
import * as types from './types'

export const login = ({dispatch, commit}, {username, password}) => {
    commit(types.LOGINREQUEST, {username});

    userService.login(username, password)
        .then(
            user => {
                commit('LOGINSUCCESS', user);
                router.push('/');
            },
            error => {
                commit('LOGINFAILURE', error);
                dispatch('alert/error', error, {root: true});
            }
        );
}
export const logout = ({commit}) => {
    userService.logout();
    commit(types.LOGOUT);
}
export const register = ({dispatch, commit}, user) => {
    commit(types.REGISTERREQUEST, user);

    userService.register(user)
        .then(
            user => {
                commit(types.REGISTERSUCCESS, user);
                router.push('/login');
                setTimeout(() => {
                    dispatch('alert/success', 'Registration successful', {root: true});
                })
            },
            error => {
                commit(types.REGISTERFAILURE, error);
                dispatch('alert/error', error, {root: true});
            }
        );
}
