<template>
  <div id="barra-lateral">
    <v-navigation-drawer
            v-if="status.loggedIn"
            v-model="drawer"
            width="240px"
            app>
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <v-icon>account_circle</v-icon>
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="title">{{ accountInfo.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ accountInfo.email }}</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-icon>mdi-menu-down</v-icon>
          </v-list-item-action>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list
              nav
              dense
      >
        <v-list-item-group v-model="item" color="primary">
          <v-list-item
                  v-for="(item, i) in items"
                  :key="i"
                  :to="item.to"
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>

            <v-list-item-content >
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>

          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
      
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "App",
  props: {
    drawer: Boolean
  },
  data() {
    return {
      clipped: false,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      item: 0,
      items: [
        { icon: "fa fa-home", text: "Inicio", to: "/"},
        { icon: "fa fa-stream" , text: "Minhas Instituições", to: "/instituicoes"},
        { icon: "fa fa-map", text: "Ponto de Doação", to: "/doacao" },
        { icon: "fa fa-calendar-alt", text: "Eventos", to: "/eventos" },
        { icon: "fa fa-cog", text: "Configuração" },
        { icon: "fa fa-comment-alt", text: "Enviar feedback" },
        { icon: "fa fa-question-circle", text: "Ajuda"}
      ],
    };
  },
  watch:{
    '$route': function (val) {
      if (val.matched[0].path === '/instituicao/:id'){
        this.drawer = false
      }
      if(val.matched[0].path !== '/instituicao/:id' && window.innerWidth > 900) {
        this.drawer = true
      }
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
        { icon: "help", text: "Sobre", to: "/sobre" },
        { icon: "settings", text: "Configuração" },
        { icon: "chat_bubble", text: "Enviar feedback" },
        { icon: "help", text: "Ajuda" },
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
