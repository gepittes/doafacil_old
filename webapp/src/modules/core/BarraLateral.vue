<template>
  <v-navigation-drawer
    v-if="status.loggedIn"
    v-model="drawer"
    clipped="clipped"
    enable-resize-watcher
    color="primary"
    width="200px"
    app
  >
    <v-list dense>
      <template v-for="item in obterMenusLaterais()">
        <v-layout row v-if="item.heading" align-center :key="item.heading">
          <v-flex xs6>
            <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
          </v-flex>
        </v-layout>
        <v-list-group
          v-else-if="item.children"
          v-model="item.model"
          :key="item.text"
          :prepend-icon="item.model ? item.icon : item['icon-alt']"
          append-icon
        >
          <v-list-tile slot="activator" :to="item.to">
            <v-list-tile-content>
              <v-list-tile-title>{{ item.text }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile v-for="(child, i) in item.children" :key="i" @click.stop :to="child.to">
            <v-list-tile-action v-if="child.icon">
              <v-icon>{{ child.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ child.text }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>
        <v-list-tile v-else @click.stop :key="item.text" :to="item.to">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.text }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "App",
  props: {
    value: {
      type: Boolean,
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
      rightDrawer: false
    };
  },
  watch: {
    value(val) {
      this.drawer = val;
    },
    drawer(val) {
      this.$emit("input", val);
    }
  },
  computed: {
    ...mapGetters({
      status: "account/status",
      token: "account/token",
      accountInfo: "account/accountInfo"
    })
  },
  methods: {
    obterMenusLaterais() {
      const menusLaterais = [
        { icon: "home", text: "Inicio", to: "/" },
        { icon: "contacts", text: "Ponto de Doaçao", to: "/doacao" },
        {
          icon: "keyboard_arrow_up",
          "icon-alt": "keyboard_arrow_down",
          text: "Instituições",
          model: false,
          children: [
            { text: "Minhas instituição", to: "/instituicoes", icon: "list" }
            // { text: 'Atualizar',  to: '#' },
            // { text: 'locais' },
            // { text: 'Eventos' },
          ]
        },
        // {
        //     icon: 'keyboard_arrow_up',
        //     'icon-alt': 'keyboard_arrow_down',
        //     text: 'Eventos',
        //     model: false,
        //     children: [
        //         { text: 'Meus eventos' },
        //
        //     ],
        // },
        { icon: "help", text: "Sobre", to: "/sobre" },
        { icon: "settings", text: "Configuração" },
        { icon: "chat_bubble", text: "Enviar feedback" },
        { icon: "help", text: "Ajuda" }
      ];
      if (this.accountInfo.is_admin === true) {
        menusLaterais.push({
          icon: "edit",
          text: "Administração",
          to: "/administracao"
        });
      }
      menusLaterais.push({
        icon: "exit_to_app",
        text: "Sair",
        to: "/logout"
      });

      return menusLaterais;
    }
  }
};
</script>
