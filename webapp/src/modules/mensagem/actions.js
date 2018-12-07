import axios from 'axios';
import * as types from './types';

export const obterMensagems = ({commit}) => {
    axios.get('http://localhost/v1/mensagem')
        .then(response => {
            const data = response.data;
            commit(types.DEFINIR_MENSAGENS, data.data)
        })
        .catch(error => {
            console.log(error)
        })
}

export const removerMensagem = ({commit}, mensagem_id) => {
    axios.delete('http://localhost/v1/mensagem/' + mensagem_id)
        .then(function () {
            commit(types.REMOVER_MENSAGEM, mensagem_id);
        });
}

export const cadastrarMensagem = ({commit}, mensagem) => {
    return axios.post('http://localhost/v1/mensagem', mensagem)
        .then((response) => {
            const data = response.data;
            commit(types.ACRESCENTAR_MENSAGEM, data.data)
        });
};

export const atualizarMensagem = ({commit}, mensagem) => {
    return axios.patch('http://localhost/v1/mensagem/' + mensagem.mensagem_id, mensagem)
        .then(() => {
            commit(types.ATUALIZAR_MENSAGEM, mensagem)
        })
        .catch(error => {
            console.log(error);
        })
};
