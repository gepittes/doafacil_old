<template>
    <v-app>
        <v-container
            fluid
            grid-list-md>
                <v-layout
                    row
                    wrap>        
                    <Ponto
                        v-for="ponto in pontoIniciais"
                        :key="ponto.id"
                        :ponto="ponto"
                    />
                </v-layout>
            <v-dialog
            v-model="dialog"
            width="500"
            >
            <template v-slot:activator="{ on }">
                <v-btn
                    fab
                    color="success"
                    dark
                    fixed
                    bottom
                    right
                    v-on="on">
                    <v-icon>add</v-icon>
                </v-btn>
            </template>

            <v-card>
                <v-card-title
                class="headline grey lighten-2"
                primary-title
                >
                Criar novo Ponto de doação
                </v-card-title>

                <v-card-text>
                        <v-flex left justify-center>
                            <v-text-field
                                v-model="ponto.nome"
                                name="nome"
                                label="Nome do ponto de Doação"/>
                            <!-- <v-text-field
                                required
                                name="Rua"
                                label="Rua"
                            /> -->
                            <!-- <v-text-field
                                required
                                name="Bairro"
                                label="Bairro"
                            />
                            <v-text-field
                                required
                                name="Bairro"
                                label="Cep"
                            />
                            <v-text-field
                                required
                                label="Estado"/>
                            <v-text-field
                                required
                                label="Cidade"
                            /> -->
                        </v-flex>
                        <v-card-actions>
                            <v-btn
                                color="secundary"
                                type="cancel"
                                class="ma ma-1"
                                @click="dialog = false">Fechar
                            </v-btn>
                            <v-btn
                                class="ma ma-1"
                                color="primary"
                                @click.native="salvar()">Salvar
                            </v-btn>
                        </v-card-actions>
                </v-card-text>
            </v-card>
            </v-dialog>
        </v-container>
    </v-app>
</template>
<script>

import { mapActions, mapGetters } from 'vuex';
import Ponto from '../../components/ponto/Ponto';

export default {
    name: 'Pontos',
    components: {
        Ponto
    },
    data() {
        return {
            submitted: false,
            pontoIniciais: [],
            dialog: false,
            ponto: {
                nome: null
            },
            // rules: {required: value => !!value || 'Campo Obrigatório.'}
        };
    },
    computed: {
        ...mapGetters({
            pontos: 'ponto/ponto',
        
        }),
    },
    watch: {
            pontos(value) {
                console.log(value);
            if ('error' in value) {
                this.pontoIniciais = {};
            } else {
                this.pontoIniciais = value;
            }
        },
    },

    created() {
        this.obterPontoDeDoacoes();
    },
    methods: {
        ...mapActions({
            obterPontoDeDoacoes: 'ponto/obterPontoDeDoacoes',
            cadastraPontoDeDoacao: 'ponto/cadastraPontoDeDoacao',
        }),
        salvar() {
            
            this.cadastraPontoDeDoacao(this.ponto)
            // Validar formulário
            // if (this.$refs.form.validate()) {

            //     // veririfica se o formulario está preenchido  para atualizar se não criando novo
            //     if (this.instituicao.id) {
            //         this.atualizarInstituicao(this.instituicaoEditar)
            //     } else {
            //         this.cadastrarInstituicao(this.instituicao)
            //     }
            //     this.reset();
            //     this.closeDialog();
            // }
        },

    },

};

</script>

