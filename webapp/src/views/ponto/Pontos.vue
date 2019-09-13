<template>
    <v-container>
        <v-row justify="center" align="center">
            <v-col xl="2" md="3">
                <v-subheader class="text-uppercase font-weight-bold">Seleciona Instituição:</v-subheader>
            </v-col>
            <v-col xl="4" md="4" cols="12">
                <v-select
                    :items="instituicoes"
                    item-text="nome"
                    item-value="id"
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
                    v-if="!isVisible"
                    @click="openPainel"
                    :disabled="isDisable"
                >Adicionar</v-btn>
            </v-col>
        </v-row>

        <v-row justify="center">
            <v-col xl="10">
                <v-expand-transition>
                    <v-expansion-panels class="mb-3"
                        v-if="isVisible"
                        :value="statusPainel"
                        :disabled="isDisable"
                    >
                        <v-expansion-panel>
                            <v-expansion-panel-header expand-icon="fa fa-plus">Criar um ponto de doação
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                                <PontoFormulario 
                                :instiSelected="instiSelected"
                               @closePainel="statusPainel = $event"
                                />
                                
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-expand-transition>

                <v-expansion-panels class="mb-3"
                                    :disabled="isDisable"
                >
                    <v-expansion-panel>
                        <v-expansion-panel-header>Gerenciar ponto de doação</v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <v-container>
                                <v-row justify="center">
                                    <v-col xl="3" md="4">
                                        <Ponto/>
                                    </v-col>
                                    <v-col xl="3" md="4">
                                        <Ponto/>
                                    </v-col>
                                    <v-col xl="3" md="4">
                                        <Ponto/>
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
    import { mapGetters, mapActions } from 'vuex';

    import Ponto from "../../components/ponto/PontoCard";
    import PontoFormulario from "../../components/ponto/PontoFormulario";

    export default {
        name: "Eventos",
        components: { Ponto, PontoFormulario },
        data() {
            return {
                statusPainel: [],
                isVisible: false,
                isDisable: true,
                instiSelected: {},
            }
        },
        watch: {
            instiSelected(){
                if(this.instiSelected) {
                    this.isDisable = false
                }
            },
        },
        computed: {
            ...mapGetters({
                instituicoes: 'instituicao/instituicao',
                accountInfo: 'account/accountInfo',
            })
        },
        methods: {
            ...mapActions({
                obterInstiUser: 'instituicao/obterInstiUser',
            }),
            openPainel() {
                this.isVisible = !this.isVisible
                setTimeout(() => {
                    this.statusPainel = 0
                }, 300)
            },
        },
        created() {
            this.obterInstiUser(this.accountInfo.user_id);
        },
    }
</script>