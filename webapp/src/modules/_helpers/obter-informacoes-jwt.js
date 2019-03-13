import * as jwt from 'jsonwebtoken';

export function obterInformacoesJWT() {
    try {
        const token = localStorage.getItem('token');
        return token != null ? jwt.verify(token, process.env.VUE_APP_JWT_SECRET) : '';
    } catch (Exception) {
        throw Exception;
    }
}
