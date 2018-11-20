import {userService} from '../user/service';
import * as types from './types'

export const login = ({dispatch, commit}, {email, password}) => {
    commit(types.LOGINREQUEST, {email});

    userService.login(email, password)
        .then(response => {
            if(response.data) {
                const data = response.data;
                if(data) {
                    commit(types.LOGINSUCCESS, data);
                    dispatch('alert/success', 'Login realizado com sucesso!', {
                        root: true
                    });
                    this.$router.push('home')
                }
            }
        })
        .catch((error) => {
            if(error.response && error.response.data) {
                commit(types.LOGINFAILURE, error.response.data.error);
                dispatch('alert/error', error.response.data.error, {
                    root: true
                });
            }
        }
)
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
                this.$router.push('/login')
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
