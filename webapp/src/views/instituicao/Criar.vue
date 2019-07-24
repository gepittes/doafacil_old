<template>
    <v-container grid-list-md>
        <v-layout wrap>
            <v-form ref="form"/>
                <v-flex xs12  sm6 md6>
                    <v-text-field       
                            v-if="false"
                            v-model="instituicao.id"
                            label="id"/>
                    <v-text-field
                            required
                            :counter="30"
                            v-model="instituicao.nome"
                            label="Nome"/>
                    <v-text-field
                            v-model="instituicao.telefone"
                            required
                            :counter="11"
                            label="Telefone"/>
                    <v-text-field
                        v-model="instituicao.uf"
                        type="text"
                        label="UF"
                        class="form-control"
                        required /> 
                </v-flex>
                <v-flex
                    xs12
                    sm6 
                    md6
                >
                    <v-text-field
                    v-model="instituicao.localidade"
                    :counter="10"
                    label="Localidade:"
                    required
                    ></v-text-field>
                    <v-text-field
                    v-model="instituicao.horario"
                    label="Horário:"
                    required
                    ></v-text-field>
                    <v-text-field
                    v-model="instituicao.banner"
                    label="Banner"
                    required
                    ></v-text-field>
                </v-flex>

                <v-flex class="text-xs-center">
                        <v-btn
                            color="secundary"
                            type="cancel"
                            @click.native="close">Fechar
                        </v-btn>
                        <v-btn
                            color="primary"
                            type="submit"
                            @click.prevent="salvar"> Salvar
                        </v-btn>
                </v-flex>
            </v-form>
        </v-layout>
    </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'NovaInstituicao',
    props: ['instituicaoEditar'],
    data() {
        return {
            instituicao: {},
            dialog: false,
        }
    },
    watch: {
        instituicaoEditar(value) {
            if ('error' in value) {
                alert(value.error);
                this.instituicao = {};
            } else {
                this.instituicao = value;
            }
        }
    },

    methods: {
        ...mapActions({
            cadastrarInstituicao: 'instituicao/cadastrarInstituicao',
            atualizarInstituicao: 'instituicao/atualizarInstituicao'
        }),

        reset() {
            this.instituicao =  {}
        }, 

        salvar(){
            if(this.instituicao.id){
                 this.atualizarInstituicao(this.instituicaoEditar)
            } else {
                this.cadastrarInstituicao(this.instituicao)
            }
            this.$emit('update:dialog', false);
            this.reset()
        },  

        close() {
           this.reset()
           this.$emit('update:dialog', false)
        },
    }
}
</script>
