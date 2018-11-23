<template>
    <v-container fluid fill-height>
        <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
            <v-layout column justify-center>
                <v-card class="elevation-12">
                    <v-toolbar dark color="primary">
                        <v-toolbar-title>Login</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-text-field
                                    prepend-icon="person"
                                    v-model="email"
                                    :rules="emailRules"
                                    label="E-mail"
                                    required
                            ></v-text-field>
                            <v-text-field
                                    prepend-icon="lock"
                                    type="password"
                                    v-model="password"
                                    :rules="passwordRules"
                                    label="Senha"
                                    required
                            ></v-text-field>
                        </v-form>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn @click="clear">Limpar</v-btn>
                            <v-btn color="primary" :disabled="!valid" @click="submit"> Entrar </v-btn>
                        </v-card-actions>
                    </v-card-text>
                </v-card>
            </v-layout>
        </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import {mapState, mapActions} from 'vuex'

    export default {
        data() {
            return {
                email: '',
                emailRules: [
                    v => !!v || 'E-mail obrigatório',
                    v => /.+@.+/.test(v) || 'E-mail precisa ser válido'
                ],
                password: '',
                passwordRules: [
                    v => !!v || 'Senha obrigatória'
                ],
                valid: true
            }
        },
        computed: {
            ...mapState('account', [
                'status',
                'loggingIn'
            ])
        },
        created() {
            // reset login status
            this.logout();
        },
        watch: {
            status: () => {
                // console.log(this)
            }
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
                    const {email, password} = this;
                    if (email && password) {
                        this.login({email, password})
                    }
                }
            },
            clear() {
                this.$refs.form.reset()
            },
            ...mapActions('account', [
                'login',
                'logout'
            ])
        }
    };
</script>
