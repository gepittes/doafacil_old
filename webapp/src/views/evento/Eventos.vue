<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col xl="3" md="3">
        <v-subheader class="text-uppercase font-weight-bold"
          >Instituição Selecionada:</v-subheader
        >
      </v-col>
      <v-col xl="4" md="4" cols="12">
        <v-select
          v-model="instiSelected"
          :items="instituicoes"
          item-text="nome"
          menu-props="auto"
          label="Selecione uma instituição"
          hide-details
          prepend-icon="list"
          single-line
          color="green"
          autofocus
        />
      </v-col>
      <v-col class="text-center" xl="2" md="3">
        <v-btn
          v-if="!getVisibleCreateEvento"
          rounded
          color="green"
          dark
          :disabled="isDisable"
          @click="openPainel"
          >Adicionar</v-btn
        >
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col xl="12">
        <v-expansion-panels class="mb-3" :disabled="isDisable">
          <v-expansion-panel>
            <v-expansion-panel-header
              >Caledário de Eventos</v-expansion-panel-header
            >
            <v-expansion-panel-content>
              <Calendario />
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>

        <v-expand-transition>
          <v-expansion-panels
            v-if="getVisibleCreateEvento"
            class="mb-3"
            :value="statusPainel"
            :disabled="isDisable"
          >
            <v-expansion-panel>
              <v-expansion-panel-header expand-icon="fa fa-plus"
                >Criação de Evento
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <EventoFormulario :instituicao-select="ObjInstiSelect" />
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-expand-transition>

        <v-expansion-panels
          class="mb-3"
          :disabled="isDisable"
          :value="statusPainelList"
        >
          <v-expansion-panel>
            <v-expansion-panel-header
              >Gerenciar Eventos</v-expansion-panel-header
            >
            <v-expansion-panel-content>
              <v-container>
                <v-row justify="center">
                  <v-col
                    v-for="evento in eventos"
                    :key="evento.id"
                    xl="3"
                    md="6"
                    lg="4"
                  >
                    <EventoCard :evento="evento" />
                  </v-col>
                </v-row>
              </v-container>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Calendario from "@/components/evento/Calendario";
import EventoCard from "@/components/evento/EventoCard";
import EventoFormulario from "@/components/evento/EventoFormulario";

export default {
  name: "Eventos",
  components: { EventoFormulario, EventoCard, Calendario },
  data() {
    return {
      isDisable: true,
      instiSelected: {},
      ObjInstiSelect: {}
    };
  },

  computed: {
    ...mapGetters({
      instituicoes: "instituicao/instituicao",
      accountInfo: "account/accountInfo",
      statusPainel: "evento/getStatusPnlCreate",
      statusPainelList: "evento/getStatusPnlList",
      getVisibleCreateEvento: "evento/getVisibleCreateEvento",
      eventos: "evento/getEventosInsti"
    })
  },

  watch: {
    instiSelected() {
      if (this.instiSelected) {
        this.isDisable = false;
      }
      // Serve para coletar o objeto da instiuicao que esta sendo selecionado.
      // O instiSelected apenas contem o nome da insituicao o ObjInstiSelect sao os dados completos.
      this.instituicoes.forEach(e => {
        if (e.nome === this.instiSelected) {
          this.ObjInstiSelect = e;
        }
      });
      this.obterEventosInstiuicao(this.ObjInstiSelect.id);
    }
  },

  created() {
    this.obterInstiUser(this.accountInfo.user_id);
  },

  methods: {
    ...mapActions({
      obterInstiUser: "instituicao/obterInstiUser",
      statusPnlCreate: "evento/statusPnlCreate",
      obterEventosInstiuicao: "evento/obterEventosInstiuicao",
      visibleCreatePnlEvento: "evento/visibleCreatePnlEvento"
    }),
    openPainel() {
      this.visibleCreatePnlEvento(!this.getVisibleCreateEvento);
      setTimeout(() => {
        this.statusPnlCreate(0);
      }, 300);
    }
  }
};
</script>
