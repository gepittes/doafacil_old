<template>
  <div>
    <template v-if="window.width < 960">
      <BarraLateral :drawer="drawer" @closeMenu="drawer = $event" />
    </template>

    <v-app-bar
      :clipped-left="clipped"
      :height="styleBar.barW"
      app
      dark
      class="gradient-doafacil-bg"
    >
      <v-container>
        <v-row v-if="!status.loggedIn" align="center" justify="end">
          <v-col xl="6">
            <router-link to="/">
              <v-img :max-width="styleBar.imgW" :src="logo" />
            </router-link>
          </v-col>

          <v-col v-if="window.width > 960" lg="7" xl="5" md="8">
            <v-form ref="form" v-model="valid" @submit.prevent="submit()">
              <v-toolbar-items>
                <v-row align="center" justify="end">
                  <v-col xl="6" lg="6" md="5">
                    <v-text-field
                      color="black"
                      prepend-icon="fa fa-user"
                      label="E-mail"
                      type="email"
                      name="email"
                      :rules="emailRules"
                      v-model="email"
                      :hide-details="true"
                      tabindex="1"
                      solo
                      shaped
                      light
                    />
                    <router-link to="/cadastrar">
                      <span class="caption ml-8 white--text">Cadastrar-se</span>
                    </router-link>
                  </v-col>
                  <v-col xl="4" lg="4" md="4">
                    <v-text-field
                      color="black"
                      prepend-icon="fa fa-lock"
                      label="Senha"
                      type="password"
                      name="password"
                      :rules="passwordRules"
                      v-model="password"
                      :hide-details="true"
                      tabindex="2"
                      solo
                      shaped
                      light
                    />
                    <router-link to="">
                      <span class="caption ml-8 white--text"
                        >Esqueci a senha</span
                      >
                    </router-link>
                  </v-col>
                  <v-col xl="2" lg="2" md="2">
                    <v-btn
                      :disabled="!valid"
                      class="transparent elevation-0 mb-4"
                      tabindex="3"
                      type="submit"
                    >
                      <v-icon>fa fa-sign-in-alt mr-2</v-icon>
                    </v-btn>
                    <v-spacer />
                  </v-col>
                </v-row>
              </v-toolbar-items>
            </v-form>
          </v-col>
          <v-col v-else align-right>
            <v-btn class="transparent elevation-0" to="/login">
              <v-icon>fa fa-sign-in-alt mr-2</v-icon>
              Login
            </v-btn>
          </v-col>
        </v-row>

        <v-row v-if="status.loggedIn" align="center" justify="end">
          <v-col md="8" lg="6" xl="5">
            <v-row align="center" justify="end">
              <v-col v-if="window.width < 960" md="1" lg="2" xl="1">
                <v-btn
                  class="transparent elevation-0"
                  @click.stop="drawer = !drawer"
                >
                  <v-icon>fa fa-list</v-icon>
                </v-btn>
              </v-col>
              <v-col md="11" lg="10" xl="11">
                <router-link v-if="window.width >= 1024" to="/">
                  <v-img :max-width="styleBar.imgW" :src="logo" />
                </router-link>
              </v-col>
            </v-row>
          </v-col>

          <v-col md="3" lg="4" xl="4" sm="5">
            <v-toolbar-items class="pa-1">
              <v-menu offset-y>
                <template v-slot:activator="{ on }">
                  <v-btn text v-on="on">
                    <v-avatar>
                      <i class="material-icons">account_circle</i>
                    </v-avatar>
                    <v-list-item-content text>
                      <v-list-item-title class="user-name" text
                        >{{ userName }}
                        <v-icon class="white--text">keyboard_arrow_down</v-icon>
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item to="/configuracao">
                    <v-list-item-title>Minha Conta</v-list-item-title>
                  </v-list-item>
                  <v-list-item to="/main">
                    <v-list-item-title>Home</v-list-item-title>
                  </v-list-item>
                  <v-list-item to="/logout" @click.stop>
                    <v-list-item-title>Sair</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-toolbar-items>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
// eslint-disable-next-line import/extensions,import/no-unresolved
import BarraLateral from './BarraLateral'
// eslint-disable-next-line import/first,import/no-unresolved
import LogoPng from '@/assets/doafacil/logos/logo-doafacil-bg-white.png'

export default {
  name: 'AppBar',
  components: { BarraLateral },
  data() {
    return {
      window: {
        width: 0,
        height: 0,
      },
      styleBar: {
        imgW: 0,
        barW: 0,
      },
      email: '',
      password: '',
      clipped: false,
      valid: true,
      drawer: false,
      logo: LogoPng,
      emailRules: [
        v => !!v || 'E-mail obrigatório',
        v => /.+@.+/.test(v) || 'E-mail precisa ser válido',
      ],
      passwordRules: [v => !!v || 'Senha obrigatória'],
    }
  },
  computed: {
    ...mapGetters({
      status: 'account/status',
      user: 'account/user',
      accountInfo: 'account/accountInfo',
    }),
    userName() {
      return this.accountInfo.name.split(' ')[0]
    },
  },
  watch: {
    'window.width': function(width) {
      if (width > 960 && this.$route.path === '/login') {
        this.$router.push({ name: 'home' })
      }
      this.window.width = width
    },
    'status.loggedIn': function() {
      if (this.status.loggedIn) {
        this.styleBar.barW = 50
        this.styleBar.imgW = 80
      }

      if (this.status.loggedIn !== true) {
        this.styleBar.barW = 100
        this.styleBar.imgW = 130
      }
    },
  },
  created() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()

    if (this.status.loggedIn) {
      this.styleBar.barW = 50
      this.styleBar.imgW = 80
    }

    if (this.status.loggedIn !== true) {
      this.styleBar.barW = 100
      this.styleBar.imgW = 130
    }
  },
  methods: {
    handleResize() {
      this.window.width = window.innerWidth
      this.window.height = window.innerHeight
    },
    submit() {
      if (this.$refs.form.validate()) {
        const { email, password } = this
        if (email && password) {
          this.login({ email, password })
        }
      }
    },
    clear() {
      this.$refs.form.reset()
    },
    ...mapActions('account', ['login', 'logout']),
  },
}
</script>
<style>
.user-name {
  text-transform: capitalize;
}
</style>
