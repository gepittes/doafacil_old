<template>
  <v-container>
    <v-form ref="form" lazy-validation @submit.prevent="salvar()">
      <v-row justify="center">
        <v-col xl="6" md="6">
          <v-text-field
            v-model="ponto.nome"
            :rules="[rules.required]"
            required
            label="Nome do ponto"
          />
          <v-textarea
            v-model="ponto.descricao"
            :rules="[rules.required]"
            label="Descrição do ponto"
          />
          <v-row justify="center">
            <v-col cols="12" xl="6" md="6">
              <v-menu
                ref="menuHoraOpen"
                v-model="menuHoraOpen"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="ponto.hora_open"
                transition="scale-transition"
                offset-y
                full-width
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="ponto.hora_open"
                    :rules="[rules.required]"
                    label="Horário de Abertura:"
                    prepend-icon="access_time"
                    readonly
                    v-on="on"
                  />
                </template>
                <v-time-picker
                  v-if="menuHoraOpen"
                  v-model="ponto.hora_open"
                  full-width
                  format="24hr"
                  scrollable
                  @click:minute="$refs.menuHoraOpen.save(ponto.hora_open)"
                />
              </v-menu>
            </v-col>
            <v-col md="6" xl="6">
              <v-menu
                ref="menuHoraClose"
                v-model="menuHoraClose"
                :close-on-content-click="false"
                :nudge-right="45"
                :return-value.sync="ponto.hora_close"
                transition="scale-transition"
                offset-y
                full-width
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="ponto.hora_close"
                    :rules="[rules.required]"
                    label="Horário de Fechamento:"
                    prepend-icon="access_time"
                    readonly
                    v-on="on"
                  />
                </template>
                <v-time-picker
                  v-if="menuHoraClose"
                  v-model="ponto.hora_close"
                  full-width
                  format="24hr"
                  scrollable
                  @click:minute="$refs.menuHoraClose.save(ponto.hora_close)"
                />
              </v-menu>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row align="center" justify="end">
        <v-card-actions>
          <v-btn
            color="secundary"
            type="cancel"
            class="ma ma-1"
            @click="closeDialog()"
            >Fechar
          </v-btn>
          <v-btn class="ma ma-1" color="primary" type="submit">Salvar </v-btn>
        </v-card-actions>
      </v-row>
    </v-form>
  </v-container>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "PontoFormulario",
  props: ["instiSelected"],
  data() {
    return {
      menuHoraOpen: false,
      menuHoraClose: false,
      submitted: false,
      ponto: {},
      rules: { required: value => !!value || "Campo Obrigatório." }
    };
  },

  computed: {
    ...mapGetters({
      accountInfo: "account/accountInfo",
      pontoEditar: "ponto/pontoEditar"
    })
  },
  watch: {
    pontoEditar: {
      deep: true,
      handler(value) {
        if ("error" in value) {
          this.ponto = {};
        } else {
          this.ponto = { ...value };
        }
      }
    }
  },
  created() {
    this.loadPonto(this.pontoEditar);
  },
  methods: {
    ...mapActions({
      cadastraPontoDeDoacao: "ponto/cadastraPontoDeDoacao",
      atualizarPonto: "ponto/atualizarPonto",
      cleanPontoEditar: "ponto/cleanPontoEditar"
    }),

    closeDialog() {
      this.resetValidation();
      this.reset();
      this.$emit("closePainel", []);
    },
    reset() {
      this.ponto = {};
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    salvar() {
      this.submitted = true;
      if (this.$refs.form.validate()) {
        const { ponto } = this;
        const instituicaoID = {
          instituicao_id: this.instiSelected
        };
        const data = Object.assign(ponto, instituicaoID);
        if (this.pontoEditar.id) {
          this.atualizarPonto(data);
          this.cleanPontoEditar({});
        } else {
          this.cadastraPontoDeDoacao(data);
        }
      }
    },
    loadPonto(value) {
      if (value) {
        this.ponto = { ...value };
      }
    }
  }
};
</script>
