export function authHeader() {
    // return authorization header with jwt token
    const token = JSON.stringify(JSON.parse(localStorage.getItem('token')));
    if (token && token.token) {
        return { Authorization: `Bearer ${token.token}` };
    }
    return {};
}
