<template>
    <section>
        <v-layout
                column
                wrap
                class="my-5"
                align-center
                color="white"
        >
            <v-flex xs12 sm4 class="my-3">
                <div class="text-xs-center">
                    <h2 class="headline">Não sou altruísta por vaidade!</h2>
                    <span class="subheading">
                Mas sim pela necessidade de fazer feliz o próximo e com isso encontrar paz e harmonia neste mundo.
              </span>
                </div>
            </v-flex>
            <v-flex xs12>
                <v-container grid-list-xl>
                    <v-layout row wrap align-center>
                        <v-flex xs12 md4>
                            <v-card class="elevation-0 transparent">
                                <v-card-text class="text-xs-center layout justify-center">
                                    <v-img :src="gifs.world" :max-width="300"/>
                                </v-card-text>
                                <v-card-title primary-title class="layout justify-center">
                                    <div class="font-weight-bold headline text-xs-center text-uppercase">Mude o
                                        mundo..
                                    </div>
                                </v-card-title>
                                <v-card-text class="t-justify">
                                </v-card-text>
                            </v-card>
                        </v-flex>
                        <v-flex xs12 md4>
                            <v-card class="elevation-0 transparent">
                                <v-card-text class="text-xs-center layout justify-center">
                                    <!--                                    <v-icon x-large class="blue&#45;&#45;text text&#45;&#45;lighten-2">flash_on</v-icon>-->
                                    <v-img :src="gifs.energy" :max-width="300"/>
                                </v-card-text>
                                <v-card-title primary-title class="layout justify-center">
                                    <div class="font-weight-bold headline text-xs-center text-uppercase">..e transforme
                                        em novas..
                                    </div>
                                </v-card-title>
                                <v-card-text class="t-justify">
                                    Precisamos nos afastar dessa pobreza de ambição onde as pessoas querem dirigir
                                    carros de luxo, vestir roupas bonitas, viver em apartamentos agradáveis, mas não
                                    querem trabalhar duro para realizar essas coisas. -- <span class="font-italic">Barack Obama</span>
                                </v-card-text>
                            </v-card>
                        </v-flex>
                        <v-flex xs12 md4>
                            <v-card class="elevation-0 transparent">
                                <v-card-text class="text-xs-center layout justify-center">
                                    <v-img :src="gifs.connt" :max-width="300"/>
                                </v-card-text>
                                <v-card-title primary-title class="layout justify-center">
                                    <div class="font-weight-bold headline text-xs-center text-uppercase">..Conexões
                                    </div>
                                </v-card-title>
                                <v-card-text class="t-justify">
                                </v-card-text>
                            </v-card>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-flex>
        </v-layout>
    </section>
</template>

<script>
    export default {
        name: "InformacoesCards",
        data() {
            return {
                gifs: {
                    world: require('../../assets/doafacil/gifs/world-no-bg.gif'),
                    energy: require('../../assets/doafacil/gifs/energy-no-bg.gif'),
                    connt: require('../../assets/doafacil/gifs/connection-no-bg.gif')
                }
            }
        }
    }
</script>