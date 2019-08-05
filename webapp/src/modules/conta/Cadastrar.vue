<template>
  <v-container fluid fill-height class="doafacil-bg-img">
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-layout column justify-center>
          <v-card class="elevation-12">
            <v-toolbar dark class="gradient-doafacil-bg">
              <MascoteGif :width="50"/>
              <v-toolbar-title class="text-uppercase">Cadastrar</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form ref="form" lazy-validation @submit.prevent="tratarSubmissao">
                <v-text-field
                  v-validate="'required'"
                  v-model="user.nome"
                  :rules="[rules.required, rules.minLength]"
                  prepend-icon="face"
                  label="Nome"
                  class="form-control"
                  required
                />
                <div v-if="submitted && errors.has('nome')" class="invalid-feedback">
                  {{
                  errors.first('nome') }}
                </div>
                <v-text-field
                  v-validate="'required'"
                  v-model="user.email"
                  :rules="[rules.required, rules.email, rules.minLength]"
                  prepend-icon="person"
                  label="E-mail"
                  class="form-control"
                  required
                />
                <div v-if="submitted && errors.has('email')" class="invalid-feedback">
                  {{
                  errors.first('email') }}
                </div>
                <v-text-field
                  v-validate="{ required: true, min: 6 }"
                  v-model="user.password"
                  :rules="[rules.required, rules.minLength]"
                  prepend-icon="lock"
                  type="password"
                  label="Senha"
                  class="form-control"
                  required
                />
                <div
                  v-if="submitted && errors.has('password')"
                  class="invalid-feedback"
                >{{ errors.first('password') }}</div>
                <v-card-actions>
                  <v-btn to="/" color="warning">Cancelar</v-btn>
                  <v-btn to="/login" color="green darken-2" class="white--text">Login</v-btn>
                  <v-spacer></v-spacer>
                  <v-btn :disabled="status.registering"  color="primary" type="submit">Cadastrar</v-btn>
                  <img v-show="status.registering" />
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
      user: {
        nome: "",
        email: "",
        password: ""
      },
      submitted: false,
      rules: {
        required: value => !!value || "Required.",
        minLength: object => object.length > 3 || "Campo obrigatório.",
        email: value => {
          // eslint-disable-next-line
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        }
      }
    };
  },
  components: {MascoteGif},
  computed: {
    ...mapState("account", ["status"])
  },
  methods: {
    ...mapActions("account", ["register"]),
    tratarSubmissao() {
      this.submitted = true;
      if (this.$refs.form.validate()) {
        this.register(this.user);
      }
    }
  }
};
</script>
