import axios from 'axios';
import * as types from './types';
import router from '../../router';
import { obterInformacoesJWT } from './_helpers/jwt';
import { requisicaoAutorizada } from './_helpers/requisicao-autorizada';

export const login = ({ dispatch, commit }, { email, password }) => {
    commit(types.LOGINREQUEST, { email });

    return requisicaoAutorizada.post(
        'http://localhost/v1/autenticacao/login',
        { email, password },
    ).then((response) => {
        try {
            if (response.data.data) {
                const { data } = response.data;
                if (data.token) {
                    commit(types.LOGINSUCCESS, data.token);
                    dispatch('alert/info', 'Login realizado com sucesso!', {
                        root: true,
                    });

                    const objetoJWT = obterInformacoesJWT();
                    commit(types.SETACCOUNTINFO, objetoJWT.user);
                    router.push({ name: 'main' });
                } else {
                    dispatch('alert/error', 'Falha ao realizar login.', {
                        root: true,
                    });
                }
            }
        } catch (Exception) {
            dispatch('alert/error', `Erro: ${Exception}`, {
                root: true,
            });
        }
    }).catch((error) => {
        if (error.response && error.response.data) {
            commit(types.LOGINFAILURE, error.response.data.error);
            dispatch('alert/error', `Erro: ${error.response.data.error}`, {
                root: true,
            });
        }
    });
};

export const logout = ({ commit }) => {
    localStorage.removeItem('token');
    commit(types.LOGOUT);
};

export const register = ({ dispatch, commit }, user) => {
    commit(types.REGISTERREQUEST);
    axios.post('http://localhost/v1/conta', JSON.parse(JSON.stringify(user))).then(
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

export const getUser = ({ dispatch, commit }, id) => {
    axios.get(`http://localhost/v1/conta/${id}`).then((response) => {
        const { data } = response;
        commit(types.USER, data.data);
    }).catch((error) => {
        dispatch('alert/error', error.response.data.error, {
            root: true,
        });
    });
};
