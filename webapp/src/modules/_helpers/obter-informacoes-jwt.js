import * as jwt from 'jsonwebtoken';

export function obterInformacoesJWT() {
    const token = localStorage.getItem('token');
    return token != null ? jwt.verify(token, process.env.VUE_APP_JWT_SECRET) : '';
}
