<template>
    <v-container>
        <v-row justify="center" align="center">
            <v-col xl="2" md="3">
                <v-subheader class="text-uppercase font-weight-bold">Instituição Selecionada:</v-subheader>
            </v-col>
            <v-col xl="4" md="4" cols="12">
                <v-select
                    :items="instituicoes"
                    item-text="nome"
                    menu-props="auto"
                    label="Selecione uma instituição"
                    hide-details
                    prepend-icon="list"
                    v-model="instiSelected"
                    single-line
                    color="green"
                    autofocus
                ></v-select>
            </v-col>
            <v-col class="text-center" xl="2" md="3">
                <v-btn rounded
                       color="green"
                       dark
                       v-if="!this.isVisible"
                       @click="openPainel"
                       :disabled="this.isDisable"
                >Adicionar</v-btn>
            </v-col>
        </v-row>

        <v-row justify="center">
            <v-col xl="10">
                <v-expansion-panels class="mb-3"
                                    :disabled="this.isDisable"
                >
                    <v-expansion-panel>
                        <v-expansion-panel-header>Caledário de Eventos</v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <Calendario/>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>

                <v-expand-transition>
                    <v-expansion-panels class="mb-3"
                                        v-if="this.isVisible"
                                        :value="this.statusPainel"
                                        :disabled="this.isDisable"
                    >
                        <v-expansion-panel>
                            <v-expansion-panel-header expand-icon="fa fa-plus">Criação de Evento
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                                <EventoFormulario :instituicao-select="ObjInstiSelect" />
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-expand-transition>

                <v-expansion-panels class="mb-3"
                                    :disabled="this.isDisable"
                >
                    <v-expansion-panel>
                        <v-expansion-panel-header>Gerenciar Eventos</v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <v-container>
                                <v-row justify="center">
                                    <v-col xl="3" md="4"
                                           v-for="evento in eventos"
                                           :key="evento.id"
                                    >
                                        <EventoCard :evento="evento"/>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    import Calendario from "../../components/evento/Calendario";
    import EventoCard from "../../components/evento/EventoCard";
    import EventoFormulario from "../../components/evento/EventoFormulario";

    export default {
        name: "Eventos",
        components: {EventoFormulario, EventoCard, Calendario},
        data() {
            return {
                isVisible: false,
                isDisable: true,
                instiSelected: {},
                ObjInstiSelect: {},
            }
        },

        watch: {
            instiSelected(value) {
                if (this.instiSelected) {
                    this.isDisable = false
                }
                // Serve para coletar o objeto da instiuicao que esta sendo selecionado.
                // O instiSelected apenas contem o nome da insituicao o ObjInstiSelect sao os dados completos.
                this.instituicoes.forEach(e => {
                    if(e.nome === this.instiSelected) {
                        this.ObjInstiSelect = e;
                    }
                });
                this.obterEventosInstiuicao(this.ObjInstiSelect.id);
            },
        },

        computed: {
            ...mapGetters({
                instituicoes: 'instituicao/instituicao',
                accountInfo: 'account/accountInfo',
                statusPainel: 'evento/getStatusPnlCreate',
                eventos: 'evento/getEventosInsti'
            })
        },

        methods: {
            ...mapActions({
                obterInstiUser: 'instituicao/obterInstiUser',
                statusPnlCreate: 'evento/statusPnlCreate',
                obterEventosInstiuicao: 'evento/obterEventosInstiuicao'
            }),
            openPainel() {
                this.isVisible = !this.isVisible;
                setTimeout(() => {
                    this.statusPnlCreate(0)
                }, 300)
            }
        },

        created() {
            this.obterInstiUser(this.accountInfo.user_id);
        },
    }
</script>