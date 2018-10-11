import axios from 'axios';
import * as types from './types';

export const obterPlataformas = ({commit}) => {
    axios.get('http://localhost/v1/plataforma')
        .then(response => {
            const data = response.data;
            // this.plataformas = data.data;

            commit(types.SET_PLATAFORMA, data.data)
        })
        .catch(error => { console.log(error) })
        // .finally(() => this.loading = false)
}
