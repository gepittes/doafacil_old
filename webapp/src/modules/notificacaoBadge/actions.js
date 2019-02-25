import axios from 'axios';
import * as types from './types';

export const obterNotificacoesUsuario = ({ dispatch, commit }, usuario_id) => {
    axios.get(`http://localhost/v1/notificacao-usuario/${usuario_id}`)
        .then((response) => {
            const data = response.data;
            commit(types.DEFINIR_NOTIFICACOES_BADGE, data.data);
        })
        .catch((error) => {
            dispatch('alert/error', error.response.data.error, {
                root: true,
            });
        });
};

export const obterNotificacoesUsuarioSistema = ({ dispatch, commit }, usuario_id, sistema_id) => {
    axios.post(
        'http://localhost/v1/notificacao-sistema',
        {
            usuario_id,
            sistema_id,
        },
    )
        .then((response) => {
            const data = response.data;
            commit(types.DEFINIR_NOTIFICACOES_BADGE, data.data);
        })
        .catch((error) => {
            dispatch('alert/error', error.response.data.error, {
                root: true,
            });
        });
};

// lerNotificacao

export const lerNotificacao = ({ dispatch, commit }, notificacao) => axios.patch(`http://localhost/v1/notificacao-usuario/${notificacao.notificacao_id}/${notificacao.usuario_id}`)
    .then(() => {
        commit(types.ATUALIZAR_NOTIFICACAO_BADGE, notificacao);
    })
    .catch((error) => {
        dispatch('alert/error', error.response.data.error, {
            root: true,
        });
    });
