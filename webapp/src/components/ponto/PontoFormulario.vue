<template>
    <v-container>
        <v-form ref="form" lazy-validation @submit.prevent="salvar()">
            <v-row justify="center" >
                <v-col xl="6" md="6">
                    <v-text-field
                        v-if="false"
                        v-model="ponto.id"
                        label="id"/>
                    <v-text-field
                        required
                        v-model="ponto.nome"
                        :rules="[rules.required]"
                        label="Nome do ponto"/>
                    <v-textarea
                        v-model="ponto.descricao"
                        label="Descrição do ponto"
                        :rules="[rules.required]"
                    ></v-textarea>
                    <v-row justify="center">
                        <v-col cols="12" xl="6" md="6">
                            <v-menu
                                ref="menuHoraOpen"
                                v-model="menuHoraOpen"
                                :close-on-content-click="false"
                                :nudge-right="40"
                                :return-value.sync="ponto.hora_open"
                                transition="scale-transition"
                                offset-y
                                full-width
                                max-width="290px"
                                min-width="290px"
                            >
                                <template v-slot:activator="{ on }">
                                    <v-text-field
                                        v-model="ponto.hora_open"
                                        label="Horário de Abertura:"
                                        prepend-icon="access_time"
                                        :rules="[rules.required]"
                                        readonly
                                        v-on="on"
                                    ></v-text-field>
                                </template>
                                <v-time-picker
                                    v-if="menuHoraOpen"
                                    v-model="ponto.hora_open"
                                    full-width
                                    format="24hr"
                                    scrollable
                                    @click:minute="$refs.menuHoraOpen.save(ponto.hora_open)"
                                ></v-time-picker>
                            </v-menu>
                        </v-col>

                        <v-col md="6" xl="6" >
                            <v-menu
                                ref="menuHoraClose"
                                v-model="menuHoraClose"
                                :close-on-content-click="false"
                                :nudge-right="45"
                                :return-value.sync="ponto.hora_close"
                                transition="scale-transition"
                                offset-y
                                full-width
                                max-width="290px"
                                min-width="290px"
                            >
                                <template v-slot:activator="{ on }">
                                    <v-text-field
                                        v-model="ponto.hora_close"
                                        label="Horário de Fechamento:"
                                        prepend-icon="access_time"
                                        :rules="[rules.required]"
                                        readonly
                                        v-on="on"
                                    ></v-text-field>
                                </template>
                                <v-time-picker
                                    v-if="menuHoraClose"
                                    v-model="ponto.hora_close"
                                    full-width
                                    format="24hr"
                                    scrollable
                                    @click:minute="$refs.menuHoraClose.save(ponto.hora_close)"
                                ></v-time-picker>
                            </v-menu>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-file-input
                                label="Imagem ponto"
                                ref="imagem"
                            />
                        </v-col>
                    </v-row>
                </v-col>

                <v-col xl="6" md="6">
                    <v-row justify="center">
                        <!-- MAP HERE -->
                        <v-img src="https://i.imgur.com/O6ZQx8b.png" width="600" height="500"/>
                    </v-row>
                </v-col>
            </v-row>

            <v-row align="center" justify="end">
                <v-card-actions>
                    <v-btn
                        color="secundary"
                        type="cancel"
                        class="ma ma-1"
                        @click="closeDialog()">Fechar
                    </v-btn>
                    <v-btn
                        class="ma ma-1"
                        color="primary"
                        type="submit">Salvar
                    </v-btn>
                </v-card-actions>
            </v-row>
        </v-form>
    </v-container>

</template>

<script>
    import axios from 'axios'
    import { mapState, mapActions, mapGetters } from 'vuex';

    export default {
        name: "pontoFormulario",
        props: ['instiSelected'],
        data() {
            return {
                menuHoraOpen: false,
                menuHoraClose: false,
                submitted: false,
                ponto: {},
                rules: {required: value => !!value || 'Campo Obrigatório.'}
            }
        },
        computed: {
            ...mapGetters({
                accountInfo: 'account/accountInfo',
            }),
        },
        methods: {
            ...mapActions({
                cadastraPontoDeDoacao: 'ponto/cadastraPontoDeDoacao',
            }),

            closeDialog() {
                this.resetValidation();
                this.reset();
                this.$emit('closePainel', [])
            },

            resetValidation() {
                this.$refs.form.resetValidation()
            },

            reset() {
                this.ponto = {}
            },

            salvar() {
                self = this
                self.submitted = true;
                if (self.$refs.form.validate()) {
                    const { ponto } = self
                    const instituicaoID = { 
                        instituicao_id: self.instiSelected 
                    }  
                    const data = Object.assign(ponto, instituicaoID);
                    
                    this.cadastraPontoDeDoacao(data)
                    this.reset();
                    this.closeDialog();
                }
            },
        }
    }
</script>