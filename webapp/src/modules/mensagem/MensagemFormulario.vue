<template>

    <v-container grid-list-md>
        <v-form v-model="valid" ref="form" @submit.prevent="save()">
            <v-layout wrap>
                <v-flex xs12 sm6 md12>
                    <v-text-field v-model="editedItem.titulo"
                                  label="Título"
                                  box
                                  minlength="3"
                                  :rules="[(object) => object!= null && object.length > 3 || 'Campo obrigatório.']"
                                  required></v-text-field>
                    <v-textarea
                            v-model="editedItem.descricao"
                            auto-grow
                            box
                            color="deep-purple"
                            label="Descrição"
                            required
                            :rules="[(object) => object!= null && object.length > 3 || 'Campo obrigatório.']"
                            rows="5"
                    ></v-textarea>

                    <h3 v-if="editedItem.mensagem_id != null"> Plataformas </h3>
                    <v-list style="overflow: auto; max-height: 300px">
                        <v-list-tile v-if="editedItem.mensagem_id == null"
                                     v-for="plataforma in this.plataformas"
                                     :key="plataforma.title"
                                     avatar>

                            <v-list-tile-content>
                                <v-checkbox v-model="editedItem.plataformas"
                                            :label="plataforma.descricao"
                                            color="success"
                                            required
                                            :value="plataforma"></v-checkbox>
                            </v-list-tile-content>

                        </v-list-tile>
                        <v-list-tile v-if="editedItem.mensagem_id != null"
                                     v-for="plataforma in editedItem.plataformas"
                                     :key="plataforma.title"
                                     avatar>

                            <v-list-tile-content>
                                {{plataforma.descricao}}
                            </v-list-tile-content>


                        </v-list-tile>
                    </v-list>
                    <br/>

                    <v-select v-model="editedItem.sistema_id"
                              :disabled="editedItem.mensagem_id != null"
                              :items="sistemasRenderizados"
                              :rules="[v => !!v || 'Campo obrigatório']"
                              label="Sistema"
                              box
                              item-text="descricao"
                              item-value="sistema_id"
                              required></v-select>

                    <v-text-field disabled
                                  :value="this.obterNomeAutor(editedItem.autor_id)"
                                  v-if="plataformasSelecionadas.length > 0"
                                  label="Autor"
                                  box></v-text-field>

                </v-flex>
                <v-flex xs12 sm6 md12>
                    <h3>Situação</h3>
                    <v-switch :label="`${editedItem.is_ativo ? 'Ativo' : 'Inativo'}`"
                              v-model="editedItem.is_ativo"></v-switch>
                </v-flex>
            </v-layout>
            <v-layout class="text-xs-center">
                <v-flex md12>
                    <v-btn dark v-if="!loading && editedItem.autor_id != null" color="blue darken-1">
                        Gravar
                    </v-btn>
                </v-flex>
            </v-layout>
        </v-form>
    </v-container>
</template>
<script>

  import {mapActions, mapGetters} from 'vuex';

  export default {
    props: {
      item: {
        type: Object,
        default: () => {
        }
      }
    },
    data: () => ({
      valid: true,
      plataformasSelecionadas: [],
      mensagensRenderizadas: [],
      sistemasRenderizados: [],
      editedIndex: -1,
      editedItem: {
        titulo: null,
        mensagem_id: null,
        autor_id: null,
        sistema_id: null,
        descricao: '',
        is_ativo: true,
        plataformas: [],
      },
    }),
    watch: {
      item(val) {
        this.editedItem = Object.assign({}, val)
        // this.editedItem = item;
      },
      mensagens(value) {
        if ('error' in value) {
          alert(value.error);
          this.mensagensRenderizadas = [];
        } else {
          this.mensagensRenderizadas = value;
        }
      },
      sistemas(value) {
        if ('error' in value) {
          this.sistemasRenderizados = [];
        } else {
          this.sistemasRenderizados = value;
        }
      },
      editedItem(value) {
        this.plataformasSelecionadas = [];
        if (this.editedItem.autor_id == null) {
          this.editedItem.autor_id = this.accountInfo.user_id;
        } else {
          for (const index in value.plataformas) {
            this.plataformasSelecionadas.push(value.plataformas[index]);
          }
        }
      },
    },

    computed: {
      formTitle() {
        return this.editedIndex === -1 ? 'Criar' : '';
      },
      ...mapGetters({
        mensagens: 'mensagem/mensagens',
        sistemas: 'sistema/sistema',
        contas: 'conta/conta',
        plataformas: 'plataforma/plataforma',
        accountInfo: 'account/accountInfo',
      }),
    },

    created() {

      // if(this.plataformas.length == null) {
      //     this.obterPlataformas();
      // }
    },
    mounted() {
      if (this.mensagens.length == null || this.mensagens.length == 0) {
        this.obterMensagems();
      }
      if (this.mensagens.length > 0) {
        this.mensagensRenderizadas = this.mensagens;
      }
      if (this.sistemas.length == null || this.sistemas.length == 0) {
        this.obterSistemas();
      }
      if (this.sistemas.length > 0) {
        this.sistemasRenderizados = this.sistemas;
      }
      if (this.contas.length == null || this.contas.length == 0) {
        this.obterContas();
      }
      if (this.plataformas.length == null || this.plataformas.length == 0) {
        this.obterPlataformas();
      }
    },
    // editedItem
    methods: {

      ...mapActions({
        obterSistemas: 'sistema/obterSistemas',
        obterMensagems: 'mensagem/obterMensagems',
        obterContas: 'conta/obterContas',
        obterPlataformas: 'plataforma/obterPlataformas',
        removerMensagem: 'mensagem/removerMensagem',
        cadastrarMensagem: 'mensagem/cadastrarMensagem',
        atualizarMensagem: 'mensagem/atualizarMensagem',
      }),
      save() {
        const self = this;
        self.loading = true;

        if (self.editedIndex > -1) {
          this.atualizarMensagem(self.editedItem);
        } else {
          console.log(self.editedItem);
          this.cadastrarMensagem(self.editedItem);
        }
        self.close();
      },

      obterNomeAutor(usuario_id) {
        // console.log(usuario_id);
        if (this.contas.length == null) {
          this.obterContas();
        }

        for (const index in this.contas) {
          if (this.contas[index].usuario_id == usuario_id) {
            return this.contas[index].nome;
          }
        }
      },

    },
  };

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
