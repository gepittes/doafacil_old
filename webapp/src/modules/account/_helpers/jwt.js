import * as jsonwebtoken from 'jsonwebtoken';

export function obterInformacoesJWT() {
    try {
        const token = localStorage.getItem('token');
        return token != null ? jsonwebtoken.verify(token, process.env.VUE_APP_JWT_SECRET) : '';
    } catch (Exception) {
        throw Exception;
    }
}

export function obterCabecalhoComToken() {
    const token = obterInformacoesJWT();
    if (token && token.token) {
        return { Authorization: `Bearer ${token.token}` };
    }
    return {};
}
