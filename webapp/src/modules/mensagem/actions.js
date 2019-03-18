import * as types from './types';
import { requisicaoAutorizada } from '../account/_helpers/requisicao-autorizada';

export const obterMensagems = ({ dispatch, commit }) => {
    requisicaoAutorizada.get('http://localhost/v1/mensagem')
        .then((response) => {
            const { data } = response;
            commit(types.DEFINIR_MENSAGENS, data.data);
        })
        .catch((error) => {
            dispatch('alert/error', error.response.data.error, {
                root: true,
            });
        });
};

export const removerMensagem = ({ dispatch, commit }, mensagemId) => {
    requisicaoAutorizada.delete(`http://localhost/v1/mensagem/${mensagemId}`)
        .then(() => {
            commit(types.REMOVER_MENSAGEM, mensagemId);
        }).catch((error) => {
            dispatch('alert/error', error.response.data.error, {
                root: true,
            });
        });
};

export const cadastrarMensagem = ({ dispatch, commit }, mensagem) => requisicaoAutorizada.post('http://localhost/v1/mensagem', mensagem)
    .then((response) => {
        const { data } = response;
        commit(types.ACRESCENTAR_MENSAGEM, data.data);
        dispatch('alert/success', 'Cadastro realizado com sucesso!', { root: true });
    }).catch((error) => {
        dispatch('alert/error', error.response.data.error, {
            root: true,
        });
    });

export const atualizarMensagem = ({ dispatch, commit }, mensagem) => requisicaoAutorizada.patch(`http://localhost/v1/mensagem/${mensagem.mensagem_id}`, mensagem)
    .then(() => {
        commit(types.ATUALIZAR_MENSAGEM, mensagem);
    })
    .catch((error) => {
        dispatch('alert/error', error.response.data.error, {
            root: true,
        });
    });
