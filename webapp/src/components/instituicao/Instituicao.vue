<template>
  <v-flex md4 sm6 xl3>
    <v-card>
      <imagem
        imgWidth="300"
        imgHeight="100"
        :objectId="instituicao.id"
        objectName="instituicao"
        modelImage="cover"
        :newImage="instituicao.image"
        @setObject="setObject($event)"
      />
      <v-card-title class="headline text-center" v-text="instituicao.nome">
      </v-card-title>
      <v-card-text>Descrição da intituicao </v-card-text>
      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn icon :to="`/instituicao/${instituicao.id}`">
          <v-icon>
            store
          </v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>
            share
          </v-icon>
        </v-btn>
        <v-btn icon @click="editar(instituicao)">
          <v-icon>
            edit
          </v-icon>
        </v-btn>
        <v-btn icon @click="show = !show">
          <v-icon>{{
            show ? "keyboard_arrow_up" : "keyboard_arrow_down"
          }}</v-icon>
        </v-btn>
      </v-card-actions>
      <v-expand-transition>
        <div v-show="show">
          <v-card-text>
            <div class="title text--primary">Horários</div>
            <v-layout>
              <v-flex>
                <b>Abertura: </b
                ><v-chip class="ma-1" color="green lighten-1"
                  ><b>{{ instituicao.hora_open }} hrs</b></v-chip
                >
                <v-spacer></v-spacer>
                <b>Fechamento: </b
                ><v-chip class="ma-1" color="red lighten-1"
                  ><b>{{ instituicao.hora_close }} hrs</b></v-chip
                >
              </v-flex>
              <v-flex>
                <b>UF: </b><v-chip class="ma-1">{{ instituicao.uf }}</v-chip>
                <v-spacer></v-spacer>
                <b>Cidade: </b
                ><v-chip class="ma-1">{{ instituicao.localidade }}</v-chip>
              </v-flex>
            </v-layout>
          </v-card-text>
        </div>
      </v-expand-transition>
    </v-card>
  </v-flex>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Instituicoes from "../../views/Instituicao/Instituicoes";
import Criar from "./InstituicaoFormulario";
import Perfil from "../../views/Instituicao/Perfil";
import imagem from "../image/Image";

export default {
  name: "Instituicao",
  components: { Criar, Perfil, Instituicoes, imagem },
  props: ["instituicao"],
  data() {
    return {
      show: false,
      dialog: false
    };
  },
  methods: {
    ...mapActions({
      statusDialog: "instituicao/setDialog",
      insitituicaoEditar: "instituicao/insitituicaoEditar",
      setImage: "instituicao/setImage"
    }),

    editar(instituicao) {
      this.statusDialog(true);
      this.insitituicaoEditar(instituicao);
    },
    setObject(e) {
      this.setImage(e);
    },
    openDialog() {
      this.dialog = true;
    },

    deletar(instituicao) {
      this.removerInstituicao(instituicao);
    }
  }
};
</script>
