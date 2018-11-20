<template>
    <v-container fluid>
        <v-layout column justify-center>
            <v-card flat>
                <v-subheader>Login</v-subheader>

                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field
                            v-model="email"
                            :rules="emailRules"
                            label="E-mail"
                            required
                    ></v-text-field>
                    <v-text-field
                            v-model="password"
                            :rules="passwordRules"
                            label="Senha"
                            required
                    ></v-text-field>

                    <v-btn :disabled="!valid"
                           @click="submit"> Entrar
                    </v-btn>
                    <v-btn @click="clear">Limpar</v-btn>
                </v-form>
            </v-card>
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
