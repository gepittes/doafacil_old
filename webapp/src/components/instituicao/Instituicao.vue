<template>
    <v-flex md4 sm6 xl3>
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
                <v-btn icon>
                    <v-icon>
                        share
                    </v-icon>
                </v-btn>
                <v-btn icon @click="editar(instituicao)">
                    <v-icon>
                        edit
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
            };
        },
        methods: {
            ...mapActions({
                statusDialog: 'instituicao/setDialog',
                insitituicaoEditar: 'instituicao/insitituicaoEditar'
            }),

            editar(instituicao) {
                this.statusDialog(true);
                this.insitituicaoEditar(instituicao);
            }
        }
    };
</script>