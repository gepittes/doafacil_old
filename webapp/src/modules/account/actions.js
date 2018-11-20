import {userService} from '../user/service';
import router from "../../router";
import * as types from './types'

export const login = ({dispatch, commit}, {email, password}) => {
    commit(types.LOGINREQUEST, {email});

    userService.login(email, password)
        .then(response => {
            const data = response.data;
            if(data) {
                commit(types.LOGINSUCCESS, data);
                router.push('/')
            }
        })
        .catch((error) => {
            console.log(error.request.status)
            commit(types.LOGINFAILURE, error.request);
            dispatch('alert/error', error.request, {root: true});
        }
)
    // .catch(error => {
    //     console.log(error)
    // })
    // .then(
    //     user => {
    // commit(types.LOGINSUCCESS, user);
    // router.push('/');
    //     },
    //     error => {
    //         commit(types.LOGINFAILURE, error);
    //         dispatch('alert/error', error, {root: true});
    //     }
    // );
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
