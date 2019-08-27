<template>
<div id="menu">
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
</div>
   

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
            type:Boolean,
            default: true
        }
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
                    icon: 'home',
                    text: 'Inicio',
                    to: '/',
                },
                {
                    icon: 'contacts',
                    text: 'Ponto de Doaçao',
                    to: '/doacao',
                },
                {
                    text: 'Instituições',
                    to: '/instituicoes',
                    icon: 'list',
                },
                {
                    icon: 'help',
                    text: 'Sobre',
                    to: '/#/sobre',
                },
                {
                    icon: 'settings',
                    text: 'Configuração',
                },
            ],
        };
    },
    watch: {
        value(val) {
            this.drawer = val;
        },
        drawer(val) {
            this.$emit('input', val);
        },
    },
    computed: {
        ...mapGetters({
            status: 'account/status',
            token: 'account/token',
            accountInfo: 'account/accountInfo',
        }),
    },
    methods: {
        obterMenusLaterais() {
            const menusLaterais = [
                {
                    icon: 'home',
                    text: 'Inicio',
                    to: '/',
                },
                {
                    icon: 'contacts',
                    text: 'Ponto de Doaçao',
                    to: '/doacao',
                },
                {
                    icon: 'keyboard_arrow_up',
                    'icon-alt': 'keyboard_arrow_down',
                    text: 'Instituições',
                    model: false,
                    children: [
                        {
                            text: 'Minhas instituição',
                            to: '/instituicoes',
                            icon: 'list',
                        },
                        // { text: 'Atualizar',  to: '#' },
                        // { text: 'locais' },
                        // { text: 'Eventos' },
                    ],
                },
                {
                    icon: 'help',
                    text: 'Sobre',
                    to: '/sobre',
                },
                {
                    icon: 'settings',
                    text: 'Configuração',
                },
                {
                    icon: 'chat_bubble',
                    text: 'Enviar feedback',
                },
                {
                    icon: 'help',
                    text: 'Ajuda',
                },

            ];
            if (this.accountInfo.is_admin === true) {
                menusLaterais.push({
                    icon: 'edit',
                    text: 'Administração',
                    to: '/administracao',
                });
            }
            menusLaterais.push({
                icon: 'exit_to_app',
                text: 'Sair',
                to: '/logout',
            });

            return menusLaterais;
        },
    },
};
</script>
<style >
    @media (max-width: 600px) {
        #menu { display: none; }

    }
</style>
