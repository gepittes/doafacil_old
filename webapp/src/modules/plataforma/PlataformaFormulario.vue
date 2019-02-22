<template>

    <v-container grid-list-md>
        <v-layout wrap>
            <v-flex xs12 sm6 md12>
                <v-text-field v-model="editedItem.descricao"
                              label="Descrição"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md12>
                <h3>Situação:</h3>
                <v-switch :label="`${editedItem.is_ativo ? 'Ativo' : 'Inativo'}`"
                          v-model="editedItem.is_ativo"></v-switch>
            </v-flex>
            <v-flex class="text-xs-center">
                <v-btn dark v-if="!loading" color="blue darken-1" @click.native="save">Gravar</v-btn>
            </v-flex>
        </v-layout>
    </v-container>

</template>
<script>

import { mapActions, mapGetters } from 'vuex';

export default {
  props: {
    item: {
      type: Object,
      default: () => {},
    },
    index: {
      type: Number,
      default: () => {},
    },
  },
  data: () => ({
    loading: false,
    editedIndex: -1,
    editedItem: {
      plataforma_id: null,
      descricao: '',
      is_ativo: true,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Criar' : 'Editar';
    },
    ...mapGetters({
      plataformas: 'plataforma/plataforma',
    }),
  },

  watch: {
    item(value) {
      this.editedItem = Object.assign({}, value);
    },
    index(value) {
      this.editedIndex = Object.assign({}, value);
    },
  },

  methods: {

    ...mapActions({
      cadastrarPlataforma: 'plataforma/cadastrarPlataforma',
      atualizarPlataforma: 'plataforma/atualizarPlataforma',
    }),

    save() {
      const self = this;
      if (this.editedItem.plataforma_id !== null) {
        this.atualizarPlataforma(self.editedItem);
      } else {
        this.cadastrarPlataforma(self.editedItem);
      }
      self.close();
    },
  },
};

</script>
