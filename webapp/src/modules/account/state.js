import { obterInformacoesJWT } from '../_helpers/obter-informacoes-jwt';

let informacoesJWT = '';
try {
    informacoesJWT = obterInformacoesJWT();
} catch (Exception) {
    informacoesJWT = '';
}

const loggedIn = informacoesJWT !== '';

export const state = {
    status: { loggedIn },
    token: informacoesJWT,
    accountInfo: informacoesJWT ? informacoesJWT.user : '',
};

