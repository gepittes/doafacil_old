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
                            <v-form ref="form" lazy-validation @submit.prevent="handleSubmit">
                                <v-text-field
                                        prepend-icon="face"
                                        v-model="user.nome"
                                        label="Nome"
                                        v-validate="'required'"
                                        class="form-control" :class="{ 'is-invalid': submitted && errors.has('nome') }"

                                        required
                                ></v-text-field>
                                <div v-if="submitted && errors.has('nome')" class="invalid-feedback">{{ errors.first('nome') }}</div>
                                <v-text-field
                                        prepend-icon="person"
                                        v-model="user.email"
                                        label="E-mail"
                                        v-validate="'required'"
                                        class="form-control" :class="{ 'is-invalid': submitted && errors.has('nome') }"

                                        required
                                ></v-text-field>
                                <div v-if="submitted && errors.has('email')" class="invalid-feedback">{{ errors.first('email') }}</div>
                                <v-text-field
                                        prepend-icon="lock"
                                        type="password"
                                        v-model="user.password"
                                        label="Senha"
                                        v-validate="{ required: true, min: 6 }"
                                        class="form-control" :class="{ 'is-invalid': submitted && errors.has('nome') }"

                                        required
                                ></v-text-field>
                                <div v-if="submitted && errors.has('password')" class="invalid-feedback">{{ errors.first('password') }}</div>

                            </v-form>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <router-link to="/login" class="btn btn-link">Cancel</router-link>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" :disabled="status.registering"> Cadastrar </v-btn>
                                <img v-show="status.registering" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                            </v-card-actions>
                        </v-card-text>
                    </v-card>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
    <!--<div>-->
        <!--<h2>Register</h2>-->
        <!--<form @submit.prevent="handleSubmit">-->
            <!--<div class="form-group">-->
                <!--<label for="nome">Nome</label>-->
                <!--<input type="text" v-model="user.nome" v-validate="'required'" name="nome" class="form-control" :class="{ 'is-invalid': submitted && errors.has('nome') }" />-->
                <!--<div v-if="submitted && errors.has('nome')" class="invalid-feedback">{{ errors.first('nome') }}</div>-->
            <!--</div>-->
            <!--<div class="form-group">-->
                <!--<label for="email">E-mail</label>-->
                <!--<input type="text" v-model="user.email" v-validate="'required'" name="email" class="form-control" :class="{ 'is-invalid': submitted && errors.has('email') }" />-->
                <!--<div v-if="submitted && errors.has('email')" class="invalid-feedback">{{ errors.first('email') }}</div>-->
            <!--</div>-->
            <!--<div class="form-group">-->
                <!--<label htmlFor="password">Password</label>-->
                <!--<input type="password" v-model="user.password" v-validate="{ required: true, min: 6 }" name="password" class="form-control" :class="{ 'is-invalid': submitted && errors.has('password') }" />-->
                <!--<div v-if="submitted && errors.has('password')" class="invalid-feedback">{{ errors.first('password') }}</div>-->
            <!--</div>-->
            <!--<div class="form-group">-->
                <!--<button class="btn btn-primary" :disabled="status.registering">Register</button>-->
                <!--<img v-show="status.registering" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />-->
                <!--<router-link to="/login" class="btn btn-link">Cancel</router-link>-->
            <!--</div>-->
        <!--</form>-->
    <!--</div>-->
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    export default {
        data () {
            return {
                user: {
                    nome: '',
                    email: '',
                    password: ''
                },
                submitted: false
            }
        },
        computed: {
            ...mapState('account', ['status'])
        },
        methods: {
            ...mapActions('account', ['register']),
            handleSubmit(e) {
console.log(e)
                this.submitted = true;
                this.$validator.validate().then(valid => {
                    if (valid) {
                        this.register(this.user);
                    }
                });
            }
        }
    };
</script>
