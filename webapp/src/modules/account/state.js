const user = JSON.parse(localStorage.getItem('user'));
export const state = user ? {status: {loggedIn: true}, user, accountInfo: {}} : {status: {}, user: null, accountInfo: {}};
