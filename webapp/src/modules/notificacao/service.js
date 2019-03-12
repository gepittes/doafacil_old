export const notificacaoService = {
    methods: {
        usuarioPossuiVinculoComSistema(sistemaNotificacao) {
            const self = this;
            const { sistemas }  = self.accountInfo;
            let possuiVinculo = false;
            sistemas.forEach((value, index) => {
                if (parseInt(value.sistema_id, 10) === parseInt(sistemaNotificacao, 10)) {
                    possuiVinculo = true;
                }
            });
        
            return possuiVinculo;
        }
    },
};