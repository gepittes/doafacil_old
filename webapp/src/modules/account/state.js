import * as jwtDecode from 'jwt-decode';

const user = JSON.parse(localStorage.getItem('user'));
const accountInfo = user != null ? jwtDecode(user) : '';
const loggedIn = user != null;

export const state = {
    status: { loggedIn },
    user: user || '',
    accountInfo: accountInfo ? accountInfo.user : '',
};

