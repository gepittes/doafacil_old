<template>
    <v-app>
        <v-container
            fluid
            grid-list-md>
            <v-expansion-panels
                v-model="panel"
                multiple
                focusable
                class="mt-5"
            >
                <v-expansion-panel>
                    <v-expansion-panel-header>Conta</v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <meu-cadastro
                            :open-painel="openPainel"
                        />
                    </v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel>
                    <v-expansion-panel-header>Minhas Doações</v-expansion-panel-header>
                    <v-expansion-panel-content/>
                </v-expansion-panel>

                <v-expansion-panel>
                    <v-expansion-panel-header>Minhas Ponto de Doações</v-expansion-panel-header>
                    <v-expansion-panel-content>
                        Some content
                    </v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel>
                    <v-expansion-panel-header>Meus Eventos</v-expansion-panel-header>
                    <v-expansion-panel-content>
                        Some content
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>


            <v-btn
                fab
                color="success"
                dark
                fixed
                bottom
                right
                @click="openDialog()">
                <v-icon>add</v-icon>
            </v-btn>
        </v-container>
    </v-app>
</template>
<script>
import MeuCadastro from '../conta/MeuCadastro.vue';

export default {
    name: 'Main',
    components: { MeuCadastro },
    data() {
        return {
            panel: [],
        };
    },
    methods: {
        openPainel(value) {
            this.panel = value;
        },
    },

};
</script>

