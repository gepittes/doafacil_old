import * as jwt from 'jsonwebtoken';
import { userService } from '../user/service';
import * as types from './types';
import router from '../../router';

export const login = ({ dispatch, commit }, { email, password }) => {
    commit(types.LOGINREQUEST, { email });

    return userService.login(email, password)
        .then((response) => {
            if (response.data && response.data.data) {
                const { data } = response.data;
                if (data && data.token) {
                    commit(types.LOGINSUCCESS, data.token);
                    dispatch('alert/info', 'Login realizado com sucesso!', {
                        root: true,
                    });

                    try {
                        const objetoJWT = jwt.verify(data.token, process.env.VUE_APP_JWT_SECRET);
console.log(objetoJWT)
                        commit(types.SETACCOUNTINFO, objetoJWT.user);

                        router.push({ name: 'home' });
                    } catch (Exception) {
                        dispatch('alert/error', `Erro${Exception}`, {
                            root: true,
                        });
                    }
                } else {
                    dispatch('alert/error', 'Falha ao realizar login.', {
                        root: true,
                    });
                }
            }
        })
        .catch((error) => {
            if (error.response && error.response.data) {
                commit(types.LOGINFAILURE, error.response.data.error);
                dispatch('alert/error', error.response.data.error, {
                    root: true,
                });
            }
        });
};

export const logout = ({ commit }) => {
    userService.logout();
    commit(types.LOGOUT);
};

export const register = ({ dispatch, commit }, user) => {
    commit(types.REGISTERREQUEST);
    userService.register(user)
        .then(
            () => {
                commit(types.REGISTERSUCCESS);
                dispatch('alert/success', 'Cadastro realizado com sucesso!', { root: true });
                router.push('/login');
            },
            (error) => {
                if (error.response && error.response.data) {
                    commit(types.REGISTERFAILURE);
                    dispatch('alert/error', error.response.data.error, {
                        root: true,
                    });
                }
            },
        );
};
