import axios from 'axios';
import * as types from './types';
import { requisicaoAutorizada } from '../account/_helpers/requisicao-autorizada';

export const statusPnlCreate = ({commit}, payload) => {
    commit(types.ESTADO_PNL_CREATE, payload)
};