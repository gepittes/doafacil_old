<template>
    <v-container>
        <v-form ref="form" @submit.prevent="salvar()">
            <v-row justify="center" align="center">
                <v-col>
                    <v-text-field
                        v-if="false"
                        v-model="evento.id"
                        label="id"/>
                    <v-text-field
                        required
                        v-model="evento.nome"
                        :rules="[rules.required]"
                        label="Nome do evento"/>
                    <v-textarea
                        v-model="evento.descricao"
                        label="Descrição do evento"
                        :rules="[rules.required]"
                    ></v-textarea>
                    <v-row justify="center">
                        <v-col xl="4" md="4" lg="4" cols="12">
                            <p>Data do Evento</p>

                            <v-dialog
                                ref="dialog_data"
                                v-model="modalData"
                                :return-value.sync="evento.data"
                                persistent
                                full-width
                                width="290px"
                            >
                                <template v-slot:activator="{ on }">
                                    <v-text-field
                                        v-model="evento.data"
                                        label="Selecione a data:"
                                        prepend-icon="event"
                                        :rules="[rules.required]"
                                        readonly
                                        v-on="on"
                                    ></v-text-field>
                                </template>
                                <v-date-picker v-model="evento.data"
                                               scrollable
                                               color="green lighten-1"
                                               locale="Brazil"
                                >
                                    <div class="flex-grow-1"></div>
                                    <v-btn text color="primary" @click="modalData = false">Cancel</v-btn>
                                    <v-btn text color="primary" @click="$refs.dialog_data.save(evento.data)">OK</v-btn>
                                </v-date-picker>
                            </v-dialog>
                        </v-col>


                        <v-col xl="4" md="4" lg="4" cols="12">
                            <p>Hora do Evento</p>
                            <v-dialog
                                ref="dialog_hora"
                                v-model="modalHora"
                                :return-value.sync="evento.hora"
                                persistent
                                full-width
                                width="290px"
                            >
                                <template v-slot:activator="{ on }">
                                    <v-text-field
                                        v-model="evento.hora"
                                        label="Selecione a hora:"
                                        prepend-icon="access_time"
                                        :rules="[rules.required]"
                                        readonly
                                        v-on="on"
                                    ></v-text-field>
                                </template>
                                <v-time-picker
                                    v-if="modalHora"
                                    v-model="evento.hora"
                                    full-width
                                    format="24hr"
                                >
                                    <div class="flex-grow-1"></div>
                                    <v-btn text color="primary" @click="modalHora = false">Cancel</v-btn>
                                    <v-btn text color="primary" @click="$refs.dialog_hora.save(evento.hora)">OK</v-btn>
                                </v-time-picker>
                            </v-dialog>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-file-input
                                label="Imagem Evento"
                                ref="imagem"
                            />
                        </v-col>
                    </v-row>
                    <v-row class="text-center">
                        <v-col>
                            <MapboxFull @localizacao="evento.localizacao = $event" />
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>

            <v-row align="center" justify="end">
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
            </v-row>
        </v-form>
    </v-container>


</template>

<script>
    import axios from 'axios'
    import {mapState, mapActions, mapGetters} from 'vuex';
    import MapboxFull from "../mapas/mapbox-full";

    export default {
        name: "EventoFormulario",
        props: {instituicaoSelect : Object},
        components: {MapboxFull},
        data() {
            return {
                modalData: false,
                modalHora: false,
                submitted: false,
                evento: {},
                rules: {required: value => !! value || 'Campo Obrigatório.'}
            }
        },
        computed: {
            ...mapGetters({
                accountInfo: 'account/accountInfo',
                getEventoEditar: 'evento/getEventoEditar'
            }),
        },
        watch: {
            getEventoEditar(value){
                this.evento = {...value}
            },
        },

        methods: {
            ...mapActions({
                statusPnlCreate: 'evento/statusPnlCreate',
                criarEvento: 'evento/criarEvento',
                setPainelList : 'evento/statusPnlList',
                eventoEditar: 'evento/eventoEditar',
                atualizarEvento: 'evento/atualizarEvento'
            }),

            closeDialog() {
                this.eventoEditar({});
                this.statusPnlCreate([]);
                this.resetValidation();
                this.reset();
            },

            resetValidation() {
                this.$refs.form.resetValidation()
            },

            reset() {
                this.evento = {}
            },

            salvar() {
                this.submitted = true;

                if (this.$refs.form.validate()) {

                    this.evento.fk_insti_id = this.instituicaoSelect.id;

                    if(this.evento.id) {
                        this.atualizarEvento(this.evento);
                        this.setPainelList(0);
                    } else {
                        this.criarEvento(this.evento);
                        this.setPainelList(0);
                    }

                    this.reset();
                    this.closeDialog();
                }
            },
        },
    }
</script>