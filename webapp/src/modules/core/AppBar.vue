<template>
    <div>
        <template v-if="status.loggedIn">
            <barra-lateral v-model="drawer"/>
        </template>

        <v-app-bar
            :clipped-left="clipped"
            app
            dark
            class="gradient-doafacil-bg">
            <v-container >
                <v-app-bar
                    flat
                    class="gradient-doafacil-bg" >
                    <v-app-bar-nav-icon
                        v-if="status.loggedIn"
                        id="menuLateral"
                        @click="drawer = !drawer"/>
                    <v-img
                        :max-width="100"
                        :src="logo"/>
                    <v-spacer/>
                    <v-toolbar-items v-if="!status.loggedIn">
                        <v-btn
                            text
                            @click="$vuetify.goTo('#sobre', options)">Quem somos</v-btn>
                        <v-btn
                            to="/login"
                            text>
                            <v-icon>fa fa-sign-in-alt mr-2</v-icon>
                            Login
                        </v-btn>
                    </v-toolbar-items>
                    <v-toolbar-items
                        v-if="status.loggedIn"
                        class="pa-1">
                        <v-menu offset-y>
                            <template v-slot:activator="{ on }">

                                <v-btn
                                    text
                                    v-on="on">
                                    <v-avatar>
                                        <i class="material-icons">account_circle</i>
                                    </v-avatar>
                                    <v-list-item-content text>
                                        <v-list-item-title
                                            class="user-name"
                                            text>{{ user }}</v-list-item-title>
                                    </v-list-item-content>
                                </v-btn>

                            </template>
                            <v-list>
                                <v-list-item
                                    to="/logout"
                                    @click.stop>
                                    <v-list-item-title>Sair</v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </v-toolbar-items>
                </v-app-bar>
            </v-container>
        </v-app-bar>
    </div>

</template>
<script>
import { mapGetters } from 'vuex';
import BarraLateral from './BarraLateral.vue';

export default {
    components: { BarraLateral },
    data() {
        return {
            loading: false,
            clipped: false,
            drawer: true,
            fixed: false,
            miniVariant: false,
            right: true,
            rightDrawer: false,
            // eslint-disable-next-line global-require,import/no-unresolved
            logo: require('@/assets/doafacil/logos/logo-doafacil-bg-white.png'),
        };
    },
    computed: {
        ...mapGetters({
            status: 'account/status',
            user: 'account/user',
            accountInfo: 'account/accountInfo',
        }),
        user() {
            const user = this.accountInfo.name.split(' ')[0];


            return user;
        },
    },
    mounted() {
        this.loading = true;
    },
};
</script>
<style >

    @media (min-width: 600px) {
        #menuLateral { display: none; }

    }

    .v-toolbar__content{
        padding-left: 0;
        padding-right: 0;
        /* height: 50px !important; */
    }

    .user-name {
        text-transform:capitalize;
    }
</style>
