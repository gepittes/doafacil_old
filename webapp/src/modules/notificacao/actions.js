import * as types from './types';
import { requisicaoAutorizada } from '../account/_helpers/requisicao-autorizada';
import { obterCabecalhoComToken } from '../account/_helpers/jwt';

export const obterNotificacoes = ({ dispatch, commit }, params) => {
    let url = `http://localhost/v1/notificacao-usuario/${params.usuarioId}`;
    if (params.isNotificacaoLida != null) {
        url += `/${params.isNotificacaoLida}`;
    }
    requisicaoAutorizada.get(url)
        .then((response) => {
            const { data } = response.data;
            commit(types.DEFINIR_NOTIFICACOES, data);
            commit(types.DEFINIR_NOTIFICACOES_BADGE, data);
        })
        .catch((error) => {
            dispatch('alert/error', error.response.data.error, {
                root: true,
            });
        });
};

export const removerNotificacao = ({ dispatch, commit }, notificacaoId) => {
    requisicaoAutorizada.delete(`http://localhost/v1/notificacao/${notificacaoId}`)
        .then(() => {
            commit(types.REMOVER_NOTIFICACAO, notificacaoId);
        }).catch((error) => {
            dispatch('alert/error', error.response.data.error, {
                root: true,
            });
        });
};

export const cadastrarNotificacao = ({ dispatch, commit }, notificacao) => requisicaoAutorizada.post('http://localhost/v1/notificacao', notificacao)
    .then((response) => {
        const { data } = response;
        commit(types.ACRESCENTAR_NOTIFICACAO, data.data);
        dispatch('alert/success', 'Cadastro realizado com sucesso!', { root: true });
    }).catch((error) => {
        dispatch('alert/error', error.response.data.error, {
            root: true,
        });
    });

export const atualizarNotificacao = ({ dispatch, commit }, notificacao) => requisicaoAutorizada.patch(`http://localhost/v1/notificacao/${notificacao.notificacao_id}`, notificacao)
    .then(() => {
        commit(types.ATUALIZAR_NOTIFICACAO, notificacao);
    })
    .catch((error) => {
        dispatch('alert/error', error.response.data.error, {
            root: true,
        });
    });

export const obterNotificacoesUsuario = ({ dispatch, commit }, params) => {
    const cabecalho = obterCabecalhoComToken();
    let url = `http://localhost/v1/notificacao-usuario/${params.usuarioId}`;
    if (params.isNotificacaoLida != null) {
        url += `/${params.isNotificacaoLida}`;
    }
    requisicaoAutorizada.get(url, cabecalho)
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

export const lerNotificacao = ({ dispatch, commit }, notificacao) => {
    requisicaoAutorizada.patch(`http://localhost/v1/notificacao-usuario-sistema/${notificacao.notificacao_id}/${notificacao.usuario_id}`)
        .then(() => {
            commit(types.ATUALIZAR_NOTIFICACAO_BADGE, notificacao);
        })
        .catch((error) => {
            dispatch('alert/error', error.response.data.error, {
                root: true,
            });
        });
};
