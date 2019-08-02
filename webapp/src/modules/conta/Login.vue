<template>
  <v-container fluid fill-height class="doafacil-bg-img">
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-layout column justify-righer>
          <v-card class="elevation-12">
            <v-toolbar dark class="gradient-doafacil-bg">
              <MascoteGif width="50"/>
              <v-toolbar-title class="text-uppercase">Login</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form ref="form" v-model="valid" @submit.prevent="submit()">
                <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  prepend-icon="person"
                  label="E-mail"
                  type="email"
                  name="email"
                  required
                />
                <v-text-field
                  v-model="password"
                  :rules="passwordRules"
                  prepend-icon="lock"
                  type="password"
                  label="Senha"
                  name="password"
                  browser-autocomplete="new-password"
                  required
                />

                <v-card-actions>
                  <v-btn :disabled="!valid" color="success" type="submit">Entrar</v-btn>
                  <v-spacer></v-spacer>
                  <v-btn to="/" color="warning" type="submit">Cancelar</v-btn>
                  <v-spacer></v-spacer>
                  <v-btn to="/cadastrar" color="primary" type="submit">Cadastre-se</v-btn>
                </v-card-actions>
              </v-form>
            </v-card-text>
          </v-card>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import MascoteGif from '../../components/genericos/MascoteGif.vue'

export default {
  data() {
    return {
      email: "",
      emailRules: [
        v => !!v || "E-mail obrigatório",
        v => /.+@.+/.test(v) || "E-mail precisa ser válido"
      ],
      password: "",
      passwordRules: [v => !!v || "Senha obrigatória"],
      valid: true
    };
  },
  components: {MascoteGif},
  computed: {
    ...mapState("account", ["status", "loggingIn"])
  },
  mounted() {
    // reset login status
    this.logout();
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        // Native form submission is not yet supported
        // axios.post('/api/submit', {
        //     name: this.name,
        //     email: this.email,
        //     select: this.select,
        //     checkbox: this.checkbox
        // })
        const { email, password } = this;
        if (email && password) {
          this.login({ email, password });
        }
      }
    },
    clear() {
      this.$refs.form.reset();
    },
    ...mapActions("account", ["login", "logout"])
  }
};
</script>
