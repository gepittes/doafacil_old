<template>
    <v-layout
        row
        wrap>
        <v-flex
            xs12
            sm6
            md12
        >
            <v-text-field
                v-model="editedItem.nome"
                :rules="[rules.required, rules.minLength]"
                prepend-icon="face"
                required
                label="Nome"/>
            <v-text-field
                v-model="editedItem.email"
                :rules="[rules.required, rules.email, rules.minLength]"
                prepend-icon="person"
                required
                label="E-mail"
            />
<!--            <v-text-field-->
<!--                v-validate="{min: 6 }"-->
<!--                v-model="editedItem.password"-->
<!--                :rules="[rules.required, rules.minLength]"-->
<!--                prepend-icon="lock"-->
<!--                type="password"-->
<!--                label="Senha"-->
<!--                required />-->
        </v-flex>

        <v-flex
            md12
            row>
            <v-col
                align-center
            >
                <v-btn
                    align-center
                    color="error"
                    @click.native="close">Fechar

                </v-btn>
            </v-col>
            <v-col align-center>
                <v-btn
                    v-if="!loading"
                    align-center
                    dark
                    color="blue darken-1"
                    @click.native="save">Gravar
                </v-btn>
            </v-col>
        </v-flex>
    </v-layout>
</template>
<script>

import { mapActions, mapGetters } from 'vuex';

export default {
    data: () => ({
        loading: false,
        editedItem: {},
        rules: {
            required: value => !!value || 'Campo Obrigatório.',
            minLength: object => (object != null && object.length != null && object.length > 3) || 'Campo obrigatório.',
            email: (value) => {
                // eslint-disable-next-line
                const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return pattern.test(value) || 'E-mail inválido.';
            },
        },
    }),
    computed: {
        ...mapGetters({
            accountInfo: 'account/accountInfo',
            user: 'account/user',
            myuser: 'conta/user',
        }),
    },
    watch: {
        user: {
            deep: true,
            handler(value) {
                if ('error' in value) {
                    this.editedItem = {};
                } else {
                    this.loadProfile(value);
                    this.editedItem = { ...value };
                }
            },
        },
    },
    mounted() {
        this.loadProfile(this.myuser);
    },
    methods: {
        save() {
            const { editedItem } = this;
            this.atualizarConta(editedItem);
            this.loadProfile(this.myuser);
            this.getUser(this.accountInfo.user_id);
        },
        loadProfile(value) {
            this.editedItem = { ...value };
        },
        ...mapActions({
            atualizarConta: 'conta/atualizarConta',
            getUser: 'account/getUser',
        }),
    },
};
</script>
