<template>
    <v-container fluid fill-height>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
                <v-layout column justify-center>
                    <v-card class="elevation-12">
                        <v-toolbar dark color="primary">
                            <v-toolbar-title>Cadastrar</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-form ref="form" lazy-validation @submit.prevent="tratarSubmissao">
                                <v-text-field
                                        prepend-icon="face"
                                        v-model="user.nome"
                                        label="Nome"
                                        v-validate="'required'"
                                        class="form-control"
                                        :rules="[rules.required]"
                                        required
                                ></v-text-field>
                                <div v-if="submitted && errors.has('nome')"
                                     class="invalid-feedback">{{
                                    errors.first('nome') }}
                                </div>
                                <v-text-field
                                        prepend-icon="person"
                                        v-model="user.email"
                                        label="E-mail"
                                        v-validate="'required'"
                                        class="form-control"
                                        :rules="[rules.required, rules.email]"
                                        required
                                ></v-text-field>
                                <div v-if="submitted && errors.has('email')"
                                     class="invalid-feedback">{{
                                    errors.first('email') }}
                                </div>
                                <v-text-field
                                        prepend-icon="lock"
                                        type="password"
                                        v-model="user.password"
                                        label="Senha"
                                        v-validate="{ required: true, min: 6 }"
                                        class="form-control"
                                        :rules="[rules.required]"
                                        required
                                ></v-text-field>
                                <div v-if="submitted && errors.has('password')"
                                     class="invalid-feedback">{{ errors.first('password') }}
                                </div>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <router-link to="/login" class="btn btn-link">Cancel</router-link>
                                    <v-spacer></v-spacer>
                                    <v-btn color="primary"
                                           type="submit"
                                           :disabled="status.registering"> Cadastrar
                                    </v-btn>
                                    <img v-show="status.registering"/>
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
  import {mapState, mapActions} from 'vuex';

  export default {
    data() {
      return {
        user: {
          nome: '',
          email: '',
          password: '',
        },
        submitted: false,
        rules: {
          required: value => !!value || 'Required.',
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.'
          }
        },
      };
    },
    computed: {
      ...mapState('account', ['status']),
    },
    methods: {
      ...mapActions('account', ['register']),
      tratarSubmissao(e) {
        console.log(e);
        this.submitted = true;
        if (this.$refs.form.validate()) {
            this.register(this.user);
          }
        },
      },
    }
  ;
</script>
