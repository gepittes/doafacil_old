import axios from 'axios';
import * as types from './types';

export const login = ({commit}, credenciais) => {
    commit(types.LOGIN);

    axios.get('http://localhost/v1/login')
        .then(response => {
            const data = response.data;

            localStorage.setItem("token", data.data);
            commit(types.LOGIN_SUCCESS);
            this.resolve();
        })
        .catch(error => {
            console.log(error)
        })
};

export const logout = ({ commit }) => {
    localStorage.removeItem("token");
    commit(types.LOGOUT);
}
