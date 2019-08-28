<template>
    <v-app>
        <v-container
            fluid
            grid-list-md>
            <div class="row">
                <div class="col-lg-3">

                    <menu-instituicao/>

                </div>
                <div class="col-lg-9 ">
            
                    <v-expansion-panels
                        v-model="panel"
                        multiple
                    >
                        <v-expansion-panel>
                        <v-expansion-panel-header>Meu Cadastro</v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <meu-cadastro/>
                        </v-expansion-panel-content>
                        </v-expansion-panel>
  
                        <v-expansion-panel>
                        <v-expansion-panel-header>Minhas Doações</v-expansion-panel-header>
                        <v-expansion-panel-content>
                            Some content
                        </v-expansion-panel-content>
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
                </div>

            </div>
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
import MenuInstituicao from '../core/MenuInstituicao'
import MeuCadastro from '../conta/MeuCadastro.vue'

export default {
    name: 'Main',
    components: { MenuInstituicao, MeuCadastro },
    data(){
        return {
            panel: [0, 1],
        }
    }

};
</script>
<style>

    .container {
        width: 1020px;
    }

    @media (max-width: 600px) {
        #avatar { display: none; }

    }

</style>
