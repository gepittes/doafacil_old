<template>
    <v-dialog
        v-model="this.dialog"
        max-width="500px"
        persistent
    >
        <v-card light>
            <v-container grid-list-md>
                <v-layout xs12 sm6 md6 align-center justify-center>
                    <v-card-text>
                        <v-list-item>
                            <v-list-item-avatar color="grey"></v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title class="headline mt-1" v-if="!instituicao.id">Cadastrar Instituição
                                </v-list-item-title>
                                <v-list-item-title class="headline ma-1" v-else>Atualizar Instituição
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-form ref="form" lazy-validation @submit.prevent="salvar()">
                            <v-flex left justify-center>
                                <v-text-field
                                    v-if="false"
                                    v-model="instituicao.id"
                                    label="id"/>
                                <v-text-field
                                    required
                                    v-model="instituicao.nome"
                                    :rules="[rules.required]"
                                    label="Nome"/>
                                <v-text-field
                                    v-model="instituicao.telefone"
                                    required
                                    :rules="[rules.required]"
                                    label="Telefone"
                                    return-masked-value
                                    v-mask="'(##) #####-####'"
                                />
                                <v-select
                                    required
                                    :items="estado"
                                    :rules="[rules.required]"
                                    v-model="instituicao.uf"
                                    label="Estados"
                                ></v-select>
                            </v-flex>
                            <v-flex right>
                                <v-select
                                    required
                                    :rules="[rules.required]"
                                    :items="cidade"
                                    v-model="instituicao.localidade"
                                    label="Cidades"
                                ></v-select>

                                <v-menu
                                    ref="menuHoraOpen"
                                    v-model="menuHoraOpen"
                                    :close-on-content-click="false"
                                    :nudge-right="40"
                                    :return-value.sync="instituicao.hora_open"
                                    transition="scale-transition"
                                    offset-y
                                    full-width
                                    max-width="290px"
                                    min-width="290px"
                                >
                                    <template v-slot:activator="{ on }">
                                        <v-text-field
                                            v-model="instituicao.hora_open"
                                            label="Horário de Abertura:"
                                            prepend-icon="access_time"
                                            :rules="[rules.required]"
                                            readonly
                                            v-on="on"
                                        ></v-text-field>
                                    </template>
                                    <v-time-picker
                                        v-if="menuHoraOpen"
                                        v-model="instituicao.hora_open"
                                        full-width
                                        format="24hr"
                                        scrollable
                                        @click:minute="$refs.menuHoraOpen.save(instituicao.hora_open)"
                                    ></v-time-picker>
                                </v-menu>

                                <v-menu
                                    ref="menuHoraClose"
                                    v-model="menuHoraClose"
                                    :close-on-content-click="false"
                                    :nudge-right="45"
                                    :return-value.sync="instituicao.hora_close"
                                    transition="scale-transition"
                                    offset-y
                                    full-width
                                    max-width="290px"
                                    min-width="290px"
                                >
                                    <template v-slot:activator="{ on }">
                                        <v-text-field
                                            v-model="instituicao.hora_close"
                                            label="Horário de Fechamento:"
                                            prepend-icon="access_time"
                                            :rules="[rules.required]"
                                            readonly
                                            v-on="on"
                                        ></v-text-field>
                                    </template>
                                    <v-time-picker
                                        v-if="menuHoraClose"
                                        v-model="instituicao.hora_close"
                                        full-width
                                        format="24hr"
                                        scrollable
                                        @click:minute="$refs.menuHoraClose.save(instituicao.hora_close)"
                                    ></v-time-picker>
                                </v-menu>
                            </v-flex>
                            <v-card-actions>
                                <v-btn
                                    color="secundary"
                                    type="cancel"
                                    class="ma ma-1"
                                    @click="closeDialog">Fechar
                                </v-btn>
                                <v-btn
                                    class="ma ma-1"
                                    color="primary"
                                    type="submit">Salvar
                                </v-btn>
                            </v-card-actions>
                        </v-form>
                    </v-card-text>
                </v-layout>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
    import axios from 'axios'
    import {mapState, mapActions, mapGetters} from 'vuex';
    import {constants} from 'crypto';
    import {mask} from 'vue-the-mask'

    export default {
        name: 'FormInstituicao',
        directives: {mask},
        data() {
            return {
                menuHoraOpen: false,
                menuHoraClose: false,
                submitted: false,
                instituicao: {},
                estados: [],
                estado: [],
                cidades: [],
                maskTel: '####-####',
                rules: {required: value => !!value || 'Campo Obrigatório.'}
            }
        },
        computed: {
            ...mapGetters({
                dialog: 'instituicao/getDialog',
                accountInfo: 'account/accountInfo',
                getInstituicaoEditar: 'instituicao/getInstituicaEditar',
            }),
            cidade() {
                this.estados.forEach(e => {
                    if (e.nome === this.instituicao.uf) {
                        this.cidades = e.cidades
                    }
                });
                return this.cidades
            },
        },
        created() {
            this.carregarEstados();
        },
        watch: {
            getInstituicaoEditar(value) {

                this.carregarEstados();
                this.instituicao.fk_usuario_id = value.fk_usuario_id;
                this.instituicao.hora_open = value.hora_open;
                this.instituicao.hora_close = value.hora_close;
                this.instituicao.id = value.id;
                this.instituicao.localidade = value.localidade;
                this.instituicao.nome = value.nome;
                this.instituicao.telefone = value.telefone;
                this.instituicao.uf = value.uf;

            },
        },
        methods: {
            ...mapActions({
                cadastrarInstituicao: 'instituicao/cadastrarInstituicao',
                atualizarInstituicao: 'instituicao/atualizarInstituicao',
                insitituicaoEditar: 'instituicao/insitituicaoEditar',
                statusDialog: 'instituicao/setDialog'
            }),

            closeDialog() {
                this.statusDialog(false);
                this.resetValidation();
                this.reset();
                this.insitituicaoEditar({ })
            },

            resetValidation() {
                this.$refs.form.resetValidation()
            },

            reset() {
                this.instituicao = {}
            },

            salvar() {
                this.submitted = true;

                if (this.$refs.form.validate()) {

                    this.instituicao.fk_usuario_id = this.accountInfo.user_id;

                    // veririfica se o formulario está preenchido  para atualizar se não criando novo
                    if (this.instituicao.id) {
                        this.atualizarInstituicao(this.instituicao)
                    } else {
                        this.cadastrarInstituicao(this.instituicao)
                    }
                    this.closeDialog();
                }
            },

            async carregarEstados() {
                await axios.get('https://gist.githubusercontent.com/letanure/3012978/raw/36fc21d9e2fc45c078e0e0e07cce3c81965db8f9/estados-cidades.json')
                    .then(res => {
                        this.estados = res.data.estados;
                        this.estados.forEach(e => {
                            this.estado.push(e.nome)
                        })
                    })
            },
        }
    }
</script>
