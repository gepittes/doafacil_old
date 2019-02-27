<template>

    <v-container grid-list-md>
        <v-layout wrap>
            <v-flex
                    xs12
                    sm6
                    md12>
                <v-textarea
                        v-model="editedItem.codigo_destinatario"
                        :rules="[(object) => object != null && object.length != null && object.length > 3 || 'Campo obrigatório.']"
                        label="Código Destinatário"
                        auto-grow
                        box
                        color="deep-purple"
                        required
                        rows="5"/>

                <v-select
                        v-model="editedItem.mensagem_id"
                        :disabled="editedItem.notificacao_id != null"
                        :items="mensagensRenderizadas"
                        :rules="[v => !!v || 'Campo obrigatório']"
                        label="Mensagem"
                        box
                        item-text="descricao"
                        item-value="mensagem_id"
                        required/>

            </v-flex>
            <v-flex class="text-xs-center">
                <v-btn
                        color="error"
                        dark
                        @click.native="close">Fechar</v-btn>
                <v-btn
                        v-if="!loading"
                        dark
                        color="blue darken-1"
                        @click.native="save">Gravar
                </v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>

  import {mapActions, mapGetters} from 'vuex';

  export default {
    props: {
      item: {
        type: Object,
        default: () => {
        },
      },
      dialog: {
        type: Boolean,
        default: false,
        required: false,
      },
    },
    data: () => ({
      mensagensRenderizadas: [],
      loading: false,
      editedItem: {},
      defaultItem: {
        notificacao_id: null,
        autor_id: null,
        mensagem_id: null,
        mensagem: null,
        descricao: '',
        is_ativo: true,
        notificacaos: [],
      },
    }),
    mounted() {
      this.editedItem = Object.assign({}, this.defaultItem);
      if (this.mensagens.length > 0) {
        this.mensagensRenderizadas = this.mensagens;
      }
      if (this.mensagens.length == null || this.mensagens.length === 0) {
        this.obterMensagems();
      }
    },

    computed: {
      ...mapGetters({
        mensagens: 'mensagem/mensagens',
      }),
    },

    watch: {
      item(value) {
        this.editedItem = Object.assign({}, value);
      },
      mensagens(value) {
        if ('error' in value) {
          this.mensagensRenderizadas = [];
        } else {
          this.mensagensRenderizadas = value;
        }
      },
    },

    methods: {

      ...mapActions({
        cadastrarNotificacao: 'notificacao/cadastrarNotificacao',
        atualizarNotificacao: 'notificacao/atualizarNotificacao',
        obterMensagems: 'mensagem/obterMensagems',
      }),

      save() {
        const self = this;
        self.loading = true;

        if (self.editedItem.notificacao_id !== null) {
          this.atualizarNotificacao(self.editedItem);
        } else {
          this.cadastrarNotificacao(self.editedItem);
          this.enviarNotificacao(self.editedItem);
        }
        this.$emit('update:dialog', false);
      },

      enviarNotificacao(editedItem) {
        let objetoMensagem = {};
        for (const index in this.mensagensRenderizadas) {
          if (this.mensagensRenderizadas[index].mensagem_id === editedItem.mensagem_id) {
            objetoMensagem = this.mensagensRenderizadas[index];
          }
        }
        if (Object.keys(objetoMensagem).length > 0) {
          const objetoNotificacao = {
            sistema: editedItem.sistema_id,
            codigo_destinatario: editedItem.codigo_destinatario,
            mensagem: objetoMensagem,
            data_envio: editedItem.data_envio,
          };
          this.enviarMensagem(JSON.stringify(objetoNotificacao));
        }
      },

      close() {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.$emit('update:dialog', false);
      },

      enviarMensagem(message) {
        const self = this;
        self.loading = true;
        setTimeout(() => {
          self.loading = false;
        }, 1000);

        this.websocket.connection.send(message);
      },
    },
  };

</script>
