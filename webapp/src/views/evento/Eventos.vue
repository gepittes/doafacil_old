<template>
    <v-container>
        <v-row justify="center" align="center">
            <v-col xl="2" md="3">
                <v-subheader class="text-uppercase font-weight-bold">Instituição Seleciona:</v-subheader>
            </v-col>
            <v-col xl="4" md="4" cols="12">
                <v-select
                    :items="instituicoes"
                    item-text="nome"
                    menu-props="auto"
                    label="Selecione uma instituição"
                    hide-details
                    prepend-icon="list"
                    single-line
                ></v-select>
            </v-col>
            <v-col class="text-center" xl="2" md="3" @click="openPainel">
                <v-btn rounded color="green" dark v-if="!this.isOpenCreate">Adicionar</v-btn>
            </v-col>
        </v-row>

        <v-row justify="center">
            <v-col xl="10">
                <v-expansion-panels class="mb-3">
                    <v-expansion-panel>
                        <v-expansion-panel-header>Caledário de Eventos</v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <Calendario/>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>

                <v-expand-transition>
                    <v-expansion-panels class="mb-3"
                                        v-if="this.isOpenCreate"
                                        :value="this.statusPainel">
                        <v-expansion-panel>
                            <v-expansion-panel-header expand-icon="fa fa-plus">Criação de Evento
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                                <EventoFormulario/>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-expand-transition>

                <v-expansion-panels class="mb-3">
                    <v-expansion-panel>
                        <v-expansion-panel-header>Gerenciar Eventos</v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <v-container>
                                <v-row justify="center">
                                    <v-col xl="3" md="4">
                                        <EventoCard/>
                                    </v-col>
                                    <v-col xl="3" md="4">
                                        <EventoCard/>
                                    </v-col>
                                    <v-col xl="3" md="4">
                                        <EventoCard/>
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
                isOpenCreate: false,
                statusPainel: 1
            }
        },


        computed: {
            ...mapGetters({
                instituicoes: 'instituicao/instituicao',
                accountInfo: 'account/accountInfo'
            })
        },

        methods: {
            ...mapActions({
                obterInstiUser: 'instituicao/obterInstiUser',
            }),
            openPainel() {
                this.isOpenCreate = !this.isOpenCreate;
                setTimeout(() => {
                    this.statusPainel = 0
                }, 300)
            }
        },

        created() {
            this.obterInstiUser(this.accountInfo.user_id);
        },
    }
</script>