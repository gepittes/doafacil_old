<template>
    <v-toolbar
            :clipped-left="clipped"
            app
            dark
            color="primary">

        <v-toolbar-side-icon
                v-if="status.loggedIn"
                @click.stop="drawer = !drawer"/>
        <v-toolbar-title/>
        <v-img
                :max-width="100"
                :src="logo"
        />
        <v-spacer></v-spacer>
        <v-toolbar-items v-if="!status.loggedIn">
            <v-btn  to="/sobre" flat>Quem somos</v-btn>
            <v-btn to="/login" flat>Login</v-btn>

        </v-toolbar-items>
        <v-toolbar-items class="pa-1" v-if="status.loggedIn">
            <v-list-tile avatar>
                <v-list-tile-avatar flat>
                    <i class="material-icons">
                        account_circle
                    </i>
                </v-list-tile-avatar>

                <v-list-tile-content flat>
                    <v-list-tile-title flat>{{ accountInfo.name }}</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-toolbar-items>
    </v-toolbar>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        name: 'Toolbar',
        data() {
            return {
                loading: false,
                clipped: true,
                drawer: null,
                logo: require('@/assets/doafacil/logos/logo-doafacil.png')
            };
        },
        computed: {
            ...mapGetters({
                status: 'account/status',
                user: 'account/user',
                accountInfo: 'account/accountInfo',
            }),
        },
        mounted() {
            this.loading = true;
        },
    };
</script>
