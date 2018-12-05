import jwt_decode from "jwt-decode";

const user = JSON.parse(localStorage.getItem('user'));
const accountInfo = user != '' ? jwt_decode(user) : '';

export const state = {
    status: { loggedIn: true },
    user: user ? user : '',
    accountInfo: accountInfo ? accountInfo.user : ''
}

