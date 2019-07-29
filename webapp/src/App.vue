<template>
  <v-app>
    <template v-if="status.loggedIn">
      <barra-lateral v-model="drawer" />
    </template>

    <v-toolbar :clipped-left="clipped" app dark color="primary">
      <v-toolbar-side-icon v-if="status.loggedIn" @click="drawer = !drawer" />
      <v-toolbar-title />
      <v-img :max-width="100" :src="logo" />
      <v-spacer></v-spacer>
      <v-toolbar-items v-if="!status.loggedIn">
        <v-btn to="/sobre" flat>Quem somos</v-btn>
        <v-btn to="/login" flat>Login</v-btn>
      </v-toolbar-items>
      <v-toolbar-items class="pa-1" v-if="status.loggedIn">
        <v-menu transition="fade-transition">
          <template v-slot:activator="{ on }">
            <v-btn flat v-on="on">
              <v-list-tile avatar>
                <v-list-tile-avatar flat>
                  <i class="material-icons">account_circle</i>
                </v-list-tile-avatar>

                <v-list-tile-content flat>
                  <v-list-tile-title flat>{{ accountInfo.name }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-btn>
          </template>
          <v-list>
            <v-list-tile @click.stop to="/logout">
              <v-list-tile-title>Sair</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <alerta
        v-if="alert.message != null && alert.message_type != null"
        :color="alert.message_type"
      >{{ alert.message }}</alerta>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

import BarraLateral from "./modules/core/BarraLateral";
import Alerta from "./modules/alert/Alerta.vue";

export default {
  name: "App",
  components: { BarraLateral, Alerta },
  data() {
    return {
      loading: false,
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      logo: require("@/assets/doafacil/logos/logo-doafacil.png")
    };
  },

  computed: {
    ...mapState({
      alert: state => state.alert
      // isLoggedIn: state => state.isLoggedIn
      // status: state => state.status
    }),
    ...mapGetters({
      status: "account/status",
      user: "account/user",
      accountInfo: "account/accountInfo"
    })
    // user() {
    //     return this.$store.state.account.status.loggedIn
    // }
  },
  mounted() {
    this.loading = true;
  },
  methods: {
    ...mapActions({
      clearAlert: "alert/clear"
    })
  }
};
</script>
