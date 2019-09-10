<template>
    <v-flex class="mt-3">
        <v-list
            class="justify-content-start"
            nav
            dense
        >
            <v-list-item-group
                v-model="item"
                color="primary">
                <v-list-item
                    v-for="(item, i) in items"
                    :key="i"
                    :to="item.to"
                >
                    <v-list-item-icon>
                        <v-icon v-text="item.icon"/>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title
                            left
                            v-text="item.text"/>
                    </v-list-item-content>

                </v-list-item>
            </v-list-item-group>
        </v-list>
    </v-flex>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'MenuLateral',
    props: {
        value: {
            type: Boolean,
            default: true,
        },
        show: {
            type: Boolean,
            default: true,
        },
        // showAvatar: {
        //     type: Boolean,
        //     default: true,
        // },
    },
    data() {
        return {
            clipped: false,
            drawer: false,
            fixed: false,
            miniVariant: false,
            right: true,
            rightDrawer: false,
            item: 0,
            items: [
                {
                    icon: 'fa fa-home',
                    text: 'Inicio',
                    to: '/main',
                },
                {
                    icon: 'fa fa-map',
                    text: 'Ponto de Doaçao',
                    to: '/pontos',
                },
                {
                    icon: 'fa fa-calendar-alt',
                    text: 'Eventos',
                    to: '/eventos',
                },
                {
                    text: 'Instituições',
                    to: '/instituicoes',
                    icon: 'fa fa-stream',
                },
                {
                    icon: 'fa fa-cog',
                    text: 'Configuração',
                    to: '/configuracao',
                },
                { 
                    icon: "fa fa-comment-alt", 
                    text: "Enviar feedback" 
                },
                { 
                    icon: "fa fa-question-circle", 
                    text: "Ajuda"
                }

            ],
        };
    },
    computed: {
        ...mapGetters({
            status: 'account/status',
            token: 'account/token',
            accountInfo: 'account/accountInfo',
        }),
    },
    watch: {
        value(val) {
            this.drawer = val;
        },
        drawer(val) {
            this.$emit('input', val);
        },
    },
    // created(){
    //     this.obterMenusLaterais(this.accountInfo)
    // },

    methods: {
        // Fica ativado por enquanto depois retira
        // obterMenusLaterais(value) {
        //     if (value.is_admin === true) {
        //         this.items.push({
        //             icon: "edit",
        //             text: "Administração",
        //             to: "/administracao"
        //         });
        //     }
        // },
    },
};
</script>
<style >
    @media (max-width: 600px) {
        #menu { display: none; }

    }
    .user-pro-img {
        float: left;
        width: 100%;
        text-align: center;
        position: relative;
    }
    .user-pro-img > a {
        width: 30px;
        height: 30px;
        -webkit-border-radius: 100px;
        -moz-border-radius: 100px;
        -ms-border-radius: 100px;
        -o-border-radius: 100px;
        border-radius: 100px;
        color: #fff;
        line-height: 40px;
        background-color: #e44d3a;
        position: absolute;
        top: 0;
        left: 60%;
    }

    .user-pro-img img {
        -webkit-border-radius: 100px;
        -moz-border-radius: 100px;
        -ms-border-radius: 100px;
        -o-border-radius: 100px;
        border-radius: 100px;
        float: none;
        border: 5px solid #fff;
    }
</style>
