import { obterInformacoesJWT } from '../_helpers/obter-informacoes-jwt';

const informacoesJWT = obterInformacoesJWT();
const loggedIn = informacoesJWT !== '';

console.log(informacoesJWT);

export const state = {
    status: { loggedIn },
    token: informacoesJWT,
    accountInfo: informacoesJWT ? informacoesJWT.user : '',
};

