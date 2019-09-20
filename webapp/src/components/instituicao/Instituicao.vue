<template>
    <v-flex md4 sm6 xl3>
        <v-row justify="center">
            <v-dialog v-model="dialog" persistent max-width="300">
                <v-card>
                    <v-card-title class="headline text-center">Tem certeza que deseja deletar este evento?
                    </v-card-title>
                    <v-card-text>Você esta prestes a deletar a instituição {{instituicao.nome}}
                    </v-card-text>
                    <v-card-actions>
                        <div class="flex-grow-1"></div>
                        <v-btn color="green darken-1" text @click="dialog = false">Cancelar</v-btn>
                        <v-btn color="red darken-1" text @click="deletar(instituicao.id)">Sim, quero deletar!</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
        <v-card>
            <v-img
                src="https://via.placeholder.com/150"
                class="white--text"
                height="200px"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            >
                <v-card-title primary-title class="fill-height align-end text-uppercase font-weight-bold"
                                v-text="instituicao.nome">
                </v-card-title>
            </v-img>
            <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn icon :to="`/instituicao/${instituicao.id}`">
                    <v-icon>
                        store
                    </v-icon>
                </v-btn>
                <v-btn icon
                       v-if="this.$route.name !== `configuracao`">
                    <v-icon>
                        share
                    </v-icon>
                </v-btn>
                <v-btn icon
                       v-if="this.$route.name !== `configuracao`"
                       @click="editar(instituicao)">
                    <v-icon>
                        edit
                    </v-icon>
                </v-btn>
                <v-btn icon
                       v-if="this.$route.name === `configuracao`"
                       @click="openDialog">
                    <v-icon>
                        delete
                    </v-icon>
                </v-btn>
                <v-btn
                    icon
                    @click="show = !show"
                >
                    <v-icon>{{ show ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
                </v-btn>
            </v-card-actions>
            <v-expand-transition>
                <div v-show="show">
                    <v-card-text>
                        <div class="title text--primary">Horários</div>
                        <v-layout>
                            <v-flex>
                                <b>Abertura: </b><v-chip class="ma-1" color="green lighten-1"><b>{{instituicao.hora_open}} hrs</b></v-chip>
                                <v-spacer></v-spacer>
                                <b>Fechamento: </b><v-chip class="ma-1" color="red lighten-1"><b>{{instituicao.hora_close}} hrs</b></v-chip>
                            </v-flex>
                            <v-flex>
                                <b>UF: </b><v-chip class="ma-1">{{instituicao.uf}}</v-chip>
                                <v-spacer></v-spacer>
                                <b>Cidade: </b><v-chip class="ma-1">{{instituicao.localidade}}</v-chip>
                            </v-flex>
                        </v-layout>

                    </v-card-text>
                </div>
            </v-expand-transition>
        </v-card>
    </v-flex>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';
    import Instituicoes from '../../views/Instituicao/Instituicoes';
    import Criar from './InstituicaoFormulario';
    import Perfil from '../../views/Instituicao/Perfil';

    export default {
        name: 'Instituicao',
        components: {Criar, Perfil, Instituicoes},
        props: ['instituicao'],
        data() {
            return {
                show: false,
                dialog: false
            };
        },
        methods: {
            ...mapActions({
                statusDialog: 'instituicao/setDialog',
                insitituicaoEditar: 'instituicao/insitituicaoEditar',
                removerInstituicao: 'instituicao/removerInstituicao'
            }),

            editar(instituicao) {
                this.statusDialog(true);
                this.insitituicaoEditar(instituicao);
            },

            openDialog(){
                this.dialog = true;
            },

            deletar(instituicao) {
                this.removerInstituicao(instituicao);
            }
        }
    };
</script>