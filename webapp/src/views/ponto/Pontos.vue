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
          :items="instituicoes"
          v-model="instiSelected"
          item-text="nome"
          item-value="id"
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
          v-if="!isVisible"
          :disabled="isDisable"
          rounded
          color="green"
          dark
          @click="openPainel"
          >Adicionar
        </v-btn>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col xl="12">
        <v-expand-transition>
          <v-expansion-panels
            v-if="isVisible"
            :value="statusPainel"
            :disabled="isDisable"
            class="mb-3"
          >
            <v-expansion-panel>
              <v-expansion-panel-header expand-icon="fa fa-plus"
                >Criar um ponto de doação
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <PontoFormulario
                  :insti-selected="instiSelected"
                  @closePainel="statusPainel = $event"
                />
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-expand-transition>

        <v-expansion-panels :disabled="isDisable" class="mb-3">
          <v-expansion-panel>
            <v-expansion-panel-header
              >Gerenciar ponto de doação</v-expansion-panel-header
            >
            <v-expansion-panel-content>
              <v-container>
                <v-row justify="center">
                  <v-col v-for="ponto in pontos" :key="ponto.id" xl="3" md="4">
                    <Ponto :ponto="ponto" :update="update" />
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

import Ponto from "../../components/ponto/PontoCard";
import PontoFormulario from "../../components/ponto/PontoFormulario";

export default {
  name: "PontosDoacao",
  components: { Ponto, PontoFormulario },
  data() {
    return {
      statusPainel: [],
      isVisible: false,
      isDisable: true,
      instiSelected: {},
      pontoEditar: {}
    };
  },
  computed: {
    ...mapGetters({
      instituicoes: "instituicao/instituicao",
      pontos: "ponto/ponto",
      accountInfo: "account/accountInfo"
    })
  },
  watch: {
    instiSelected() {
      if (this.instiSelected) {
        this.isDisable = false;
        this.getPontoByInst(this.instiSelected);
      }
    }
  },
  created() {
    this.obterInstiUser(this.accountInfo.user_id);
  },
  methods: {
    ...mapActions({
      obterInstiUser: "instituicao/obterInstiUser",
      getPontoByInst: "ponto/getPontoByInst",
      setPontoEditar: "ponto/setPontoEditar"
    }),
    openPainel() {
      this.isVisible = !this.isVisible;
      setTimeout(() => {
        this.statusPainel = 0;
      }, 300);
    },
    update(ponto) {
      this.isVisible = true;
      setTimeout(() => {
        this.statusPainel = 0;
      }, 300);
      this.setPontoEditar(ponto);
    }
  }
};
</script>
