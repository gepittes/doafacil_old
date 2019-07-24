<template>
    <v-app>
    <v-container fluid>
      <div b-row >
            <v-flex pb-3  cols="6" md="4"
            v-for="instituicao in instituicoesIniciais" :key="instituicao.id">
                <v-card b-col sm="4">
                    <v-card-title primary-title>
                        <div>
                            <div class="headline">{{ instituicao.nome }}</div>
                             <p ma-1 class="grey--text">Cidade: {{ instituicao.localidade }}</p> 
                             <p ma-1 class="grey--text">Estado: {{ instituicao.uf }}</p>
                             <p ma-1 class="grey--text">Membro desde: {{ instituicao.created_at }}</p>
                        </div>
                    </v-card-title>
                        <div class="text-sm-left">
                            <v-rating v-model="votos"></v-rating>
                        </div>
                    <v-card-actions>
                        <v-btn >Explorar</v-btn>
                        <v-btn >Compatilhar</v-btn> 
                        <v-btn  color="warning" @click="excluirInstituicao(instituicao.id)">Excluir</v-btn>  
                        <v-btn  color="info" @click="editarInstituicao(instituicao)">Editar</v-btn>
                       
                        <v-spacer></v-spacer>
                       <v-btn icon color="primary">+
                            <v-icon></v-icon>
                       </v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
            <v-btn
                    fab
                    color="success"
                    dark
                    fixed
                    bottom
                    right
                    @click="dialog = !dialog">
                <v-icon>add</v-icon>
            </v-btn>

        <v-dialog
                    v-model="dialog"
                    max-width="700px">
                <v-card light>
                    <v-card-text>
                        <v-toolbar
                            dark
                            color="primary">
                            <v-toolbar-title>Cadastrar nova Instituição</v-toolbar-title>
                        </v-toolbar>
                        <Criar 
                        :instituicaoEditar="instituicaoEditar"
                        :dialog.sync="dialog"/>
                    </v-card-text>
                </v-card>
        </v-dialog>
      </div>
    </v-container>
    </v-app>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import Criar from '../../views/instituicao/Criar'
import Perfil from '../../views/instituicao/Perfil'

export default {
    components: { Criar, Perfil},
    data(){
        return {
            votos: 3,
            instituicoesIniciais: [],
            instituicao: {},
            instituicaoEditar: {},
            dialog: false,
        }
    },
    watch: {
        instituicoes(value) {
            if ('error' in value) {
                alert(value.error);
                this.instituicoesIniciais = {}
            } else {
                this.instituicoesIniciais = value;
            }
        },
    },
    computed: {
        ...mapGetters({
            instituicoes: 'instituicao/instituicao',
        }),
    },
    created() {
        this.obterInstituicoes();
    },
    methods: {
        ...mapActions({
            obterInstituicoes: 'instituicao/obterInstituicoes',
            removerInstituicao: 'instituicao/removerInstituicao',
        }),
        excluirInstituicao(id) {
            this.removerInstituicao(id)
        },
        editarInstituicao(instituicao){
           this.instituicaoEditar =  { ...instituicao}
           this.dialog = true 
        },
        perfilInstituicao(instituicao) {
            this.instituicaoEditar =  { ...instituicao}
        }
    }
}

</script>
