import axios from 'axios';
import * as types from './types';
import {requisicaoAutorizada} from '../account/_helpers/requisicao-autorizada';

const URL = 'http://localhost/v1';

export const statusPnlCreate = ({commit}, payload) => {
    commit(types.ESTADO_PNL_CREATE, payload)
};

export const criarEvento = ({commit, dispatch}, payload) => {
    requisicaoAutorizada.post(`${URL}/evento`, payload)
        .then(resp => {
            commit(types.CRIAR_EVENTO, resp.data);
            dispatch('alert/success', 'Evento cadastrado com sucesso.', {root: true})
        })
        .catch((error) => {
            dispatch('alert/error', 'Falha ao salvar evento.', {root: true})
        })
};

export const obterEventosInstiuicao = ({commit, dispatch}, id) => {
    requisicaoAutorizada.get(`${URL}/evento/inistituicao/${id}`)
        .then(resp => {
            commit(types.EVENTOS_INSTITUICAO, resp.data.data);
        })
        .catch((error) => {
            dispatch('alert/error', 'Falha ao obter eventos.', {root: true})
        })
};