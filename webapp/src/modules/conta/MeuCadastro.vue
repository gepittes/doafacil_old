<template>
  <v-layout row wrap>
    <v-flex xs12 sm6 md12>
      <v-form ref="formconta" v-model="valid" :lazy-validation="lazy">
        <v-text-field
          v-model="editedItem.nome"
          :rules="[rules.required, rules.minLength]"
          prepend-icon="face"
          required
          label="Nome"
        />
        <v-text-field
          v-model="editedItem.email"
          :rules="[rules.required, rules.email, rules.minLength]"
          prepend-icon="person"
          required
          label="E-mail"
        />
      </v-form>
    </v-flex>

    <v-flex md12 row>
      <v-col align-center class="col-4">
        <v-btn align-center color="error" @click.native="openPainel([])"
          >Fechar
        </v-btn>
      </v-col>
      <v-col align-center class="col-4">
        <v-btn
          v-if="!loading"
          align-center
          dark
          color="success"
          @click.native="save"
          >Atualizar Conta
        </v-btn>
      </v-col>
      <v-dialog v-model="dialog" persistent max-width="350">
        <template v-slot:activator="{ on }" class="m-0">
          <v-col class="col-4">
            <v-btn align-right dark color="blue darken-1" v-on="on"
              >Alterar senha</v-btn
            >
          </v-col>
        </template>
        <v-card>
          <v-card-title class="headline"
            >Alterando a senha da conta</v-card-title
          >
          <v-col>
            <v-form ref="formse" v-model="valid" :lazy-validation="lazy">
              <v-text-field
                v-model="senha.password"
                :rules="[rules.required, rules.minLength]"
                prepend-icon="lock"
                type="password"
                required
                label="Senha Atual"
              />
              <v-text-field
                v-validate="{ min: 6 }"
                v-model="senha.passwordNova"
                :rules="[rules.required, rules.minLength]"
                prepend-icon="lock"
                required
                type="password"
                label="Nova senha"
              />
              <v-btn color="warning" class="mr-4" @click="resetSenha()">
                Cancelar
              </v-btn>

              <v-btn :disabled="!valid" color="success" @click="save">
                Salvar senha
              </v-btn>
            </v-form>
          </v-col>
        </v-card>
      </v-dialog>
    </v-flex>
  </v-layout>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  props: {
    openPainel: { type: Function, required: true },
  },
  data: () => ({
    loading: false,
    dialog: false,
    senha: {},
    valid: true,
    editedItem: {},
    rules: {
      required: value => !!value || 'Campo Obrigatório.',
      minLength: object =>
        (object != null && object.length != null && object.length > 3) ||
        'Campo obrigatório.',
      email: value => {
        // eslint-disable-next-line
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'E-mail inválido.'
      },
    },
    lazy: false,
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
          this.editedItem = {}
        } else {
          this.loadProfile(value)
        }
      },
    },
  },
  created() {
    this.loadProfile(this.myuser)
    this.getUser(this.accountInfo.user_id)
  },
  methods: {
    resetSenha() {
      this.senha = {}
      this.dialog = false
    },
    save() {
      const { editedItem } = this
      const { senha } = this
      const isHasSenha = Object.keys(senha).length
      if (isHasSenha < 1 && this.dialog === false) {
        this.resetSenha()
        this.atualizarConta(editedItem)
      } else {
        const userId = {
          usuario_id: this.user.usuario_id,
        }
        const data = Object.assign(senha, userId)
        this.atualizarConta(data)
        this.dialog = false
        this.resetSenha()
      }
    },
    loadProfile(value) {
      this.editedItem = { ...value }
    },
    ...mapActions({
      atualizarConta: 'conta/atualizarConta',
      getUser: 'account/getUser',
    }),
  },
}
</script>
