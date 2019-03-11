import * as jwtDecode from 'jwt-decode';

let token = localStorage.getItem('token');

if (token !== '') {
    token = JSON.parse(JSON.stringify(token));
}
const accountInfo = token != null ? jwtDecode(token) : '';
const loggedIn = token != null;

export const state = {
    status: { loggedIn },
    token: token || '',
    accountInfo: accountInfo ? accountInfo.token : '',
};

