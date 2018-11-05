import {userService} from '../user/service';
import {router} from '../_helpers';

export const login = ({dispatch, commit}, {username, password}) => {
    commit('loginRequest', {username});

    userService.login(username, password)
        .then(
            user => {
                commit('loginSuccess', user);
                router.push('/');
            },
            error => {
                commit('loginFailure', error);
                dispatch('alert/error', error, {root: true});
            }
        );
}
export const logout = ({commit}) => {
    userService.logout();
    commit('logout');
}
export const register = ({dispatch, commit}, user) => {
    commit('registerRequest', user);

    userService.register(user)
        .then(
            user => {
                commit('registerSuccess', user);
                router.push('/login');
                setTimeout(() => {
                    dispatch('alert/success', 'Registration successful', {root: true});
                })
            },
            error => {
                commit('registerFailure', error);
                dispatch('alert/error', error, {root: true});
            }
        );
}
