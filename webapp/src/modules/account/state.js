import jwt_decode from 'jwt-decode';

const user = JSON.parse(localStorage.getItem('user'));
const accountInfo = user != null ? jwt_decode(user) : '';
const loggedIn = user != null;

export const state = {
  status: { loggedIn },
  user: user || '',
  accountInfo: accountInfo ? accountInfo.user : '',
};

