<template>
  <v-card max-width="300">
    <imagem
      imgWidth="300"
      imgHeight="200"
      :objectId="ponto.id"
      objectName="ponto"
      modelImage="cover"
      :newImage="ponto.image"
      @setObject="setObject($event)"
    />
    <v-card-title v-text="ponto.nome" />
    <v-card-text>
      <div>{{ ponto.descricao }}</div>
    </v-card-text>

    <v-divider class="mx-4 m-0" />

    <v-card-text>
      <div class="title text--primary">Horário</div>
      <p>
        Abre <strong>{{ ponto.hora_open }}</strong> e fecha ás
        <strong>{{ ponto.hora_close }}</strong>
      </p>
    </v-card-text>

    <v-card-actions>
      <v-btn color="deep-purple accent-4" text @click="openMap">
        <v-icon>fa fa-map-marker-alt mr-2</v-icon>
        Mapa do local
      </v-btn>
      <v-spacer />
      <v-btn icon @click="update(ponto)">
        <v-icon>
          edit
        </v-icon>
      </v-btn>

      <v-dialog v-model="dialog" persistent max-width="290">
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>
              delete
            </v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="headline">Excluir o ponto!</v-card-title>
          <v-card-text
            >Seu ponto será excluido permanente você deseja realmente
            continuar?</v-card-text
          >
          <v-card-actions>
            <v-btn
              color="blue-grey"
              class="ma-2 white--text"
              @click="dialog = false"
              ><i class="fas fa-window-close mr-1" /> Não
            </v-btn>
            <v-spacer />
            <v-btn
              class="ma-2 white--text"
              color="error"
              @click="deletePonto()"
            >
              <v-icon>delete</v-icon> Sim
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card-actions>
  </v-card>
</template>

<script>
import imagem from "../image/Image";
import { mapActions, mapMutations } from "vuex";

export default {
  name: "PontoCard",
  components: { imagem },
  props: {
    ponto: {
      type: Object,
      required: true
    },
    update: { type: Function }
  },
  data() {
    return {
      dialog: false,
      selection: 1
    };
  },
  methods: {
    ...mapActions({
      removerPonto: "ponto/removerPonto",
      setImage: "ponto/setImage"
    }),

    deletePonto() {
      this.dialog = !this.dialog;
      this.removerPonto(this.ponto.id);
    },
    setObject(e) {
      this.setImage(e);
    },

    openMap() {
      //
    }
  }
};
</script>
