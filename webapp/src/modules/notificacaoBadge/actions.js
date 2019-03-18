import axios from 'axios';
import * as types from './types';
import { obterCabecalhoComToken } from '../account/_helpers/jwt';

export const obterNotificacoesUsuario = ({ dispatch, commit }, usuarioId, sistemaId) => {
    const header = obterCabecalhoComToken();

    let url = `http://localhost/v1/notificacao-usuario-sistema/${usuarioId}`;
    if (sistemaId != null) {
        url += `/${sistemaId}`;
    }
    axios.get(url, header)
        .then((response) => {
            const { data } = response.data;
            commit(types.DEFINIR_NOTIFICACOES_BADGE, data);
        })
        .catch((error) => {
            dispatch('alert/error', error.response.data.error, {
                root: true,
            });
        });
};

export const lerNotificacao = ({ dispatch, commit }, notificacao) => axios.patch(`http://localhost/v1/notificacao-usuario-sistema/${notificacao.notificacao_id}/${notificacao.usuario_id}`)
    .then(() => {
        commit(types.ATUALIZAR_NOTIFICACAO_BADGE, notificacao);
    })
    .catch((error) => {
        dispatch('alert/error', error.response.data.error, {
            root: true,
        });
    });
