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
    const token = localStorage.getItem('token');
    if (token) {
        return {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
    }
    return {};
}
