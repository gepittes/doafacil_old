<template>
    <v-flex md4 sm6 xl3>
        <v-card
            class="mx-auto"
            max-width="400"
        >
            <v-img
            class="white--text"
            height="200px"
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
            >
            <v-card-title class="align-end fill-height">Nome Da Cidade</v-card-title>
            </v-img>

            <v-card-text>
            <span class="text--primary">
                <span>Administrada por: <strong>Nome da Instituicao</strong></span><br>
    
            </span>
            </v-card-text>

            <v-card-actions>
            <v-row fluid justify="center" align="center">
                <v-btn small cols="4" >Visitar </v-btn>
                <v-btn small cols="4" >Comentar </v-btn>
                <v-btn small cols="4" >Compartilhar </v-btn>
            </v-row>
            </v-card-actions>
        </v-card>
        <!-- <v-card>
            <v-img
                src="https://via.placeholder.com/150"
                class="white--text"
                height="200px"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            >
                <v-card-title primary-title class="fill-height align-end text-uppercase font-weight-bold"
                                v-text="instituicao.nome">
                </v-card-title>
            </v-img> -->
            <!-- <v-card-actions>
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
            </v-card-actions> -->
        <!-- </v-card> -->
    </v-flex>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';


    export default {
        name: 'Ponto',
        props: ['ponto']
        // data() {
        //     return {
        //         votos: 3,
        //         show: false,
        //     };
        // },
        // methods: {
        //     ...mapActions({
        //         statusDialog: 'instituicao/setDialog',
        //         insitituicaoEditar: 'instituicao/insitituicaoEditar'
        //     }),

        //     editar(instituicao) {
        //         console.log(instituicao)

        //         this.statusDialog(true);
        //         this.insitituicaoEditar(instituicao);

        //     }
        // }
    };
</script>