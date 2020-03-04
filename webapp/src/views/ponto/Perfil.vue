<template>
  <v-app>
    <v-row justify="center">
      <v-col>
        <v-card class="m-1">
          <v-img
            class="white--text"
            height="200px"
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          >
            <v-card-title class="align-end fill-height"
              >Pondo de Doação
              <v-spacer></v-spacer>
              <v-btn small>Configuração</v-btn>
            </v-card-title>
          </v-img>
          <v-card-text>
            <v-row md="12">
              <v-col md="12">
                <v-expansion-panels>
                  <v-expansion-panel>
                    <v-expansion-panel-header
                      >Horários de funcionamento</v-expansion-panel-header
                    >
                    <v-expansion-panel-content>
                      <v-flex justify="center">
                        <strong>Abertura: </strong
                        ><v-chip class="ma-1" label>08:00 hrs</v-chip>
                        <v-spacer></v-spacer>
                        <strong>Fechamento: </strong
                        ><v-chip class="ma-1" label>18:00 hrs</v-chip>
                      </v-flex>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-col>
              <v-col md="12">
                <v-expansion-panels>
                  <v-expansion-panel>
                    <v-expansion-panel-header
                      >Endereço</v-expansion-panel-header
                    >
                    <v-expansion-panel-content>
                      <strong>Estado: </strong
                      ><v-chip class="ma-1" label>Distrito Federal DF</v-chip>
                      <v-spacer></v-spacer>
                      <strong>Cidade: </strong
                      ><v-chip class="ma-1" label>Gama - DF</v-chip>
                      <v-spacer></v-spacer>
                      <strong>Rua: </strong
                      ><v-chip class="ma-1" label>Barra</v-chip>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-col>
              <v-col md="12">
                <v-expansion-panels>
                  <v-expansion-panel>
                    <v-expansion-panel-header
                      >Itens recolhidos</v-expansion-panel-header
                    >
                    <v-expansion-panel-content>
                      <v-chip class="ma-2">Roupas</v-chip>
                      <v-chip class="ma-2">brinquedos</v-chip>
                      <v-chip class="ma-2">calçados</v-chip>
                      <v-chip class="ma-2">pequenos objetos</v-chip>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-col>
              <v-col md="12">
                <v-expansion-panels>
                  <v-expansion-panel>
                    <v-expansion-panel-header>Mapa</v-expansion-panel-header>
                    <v-expansion-panel-content>
                      ...
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-actions> </v-card-actions>
        </v-card>
      </v-col>
      <!-- <v-col >
                <section class="cover">
                    <img
                        src="http://via.placeholder.com/960x300"
                        alt="">
                </section>

                <h3>{{ instituicao.nome }}</h3>
                <div class="mb-3">
                    <span>Localidade: {{ instituicao.localidade }} - {{ instituicao.uf }}</span>
                </div>
                <v-card>
                    <v-tabs
                        v-model="tab"
                        background-color="grey lighten-4"
                        centered
                        icons-and-text
                    >
                        <v-tabs-slider/>

                        <v-tab href="#tab-1">
                            publicações
                            <v-icon>edit</v-icon>
                        </v-tab>

                        <v-tab href="#tab-2">
                            Ponto de Doação
                            <v-icon>favorite</v-icon>
                        </v-tab>

                        <v-tab href="#tab-3">
                            Eventos
                            <v-icon>account_box</v-icon>
                        </v-tab>
                    </v-tabs>

                    <v-tabs-items v-model="tab">
                        <v-tab-item
                            v-for="i in 3"
                            :key="i"
                            :value="'tab-' + i"
                        >
                            <v-card flat>
                                <v-card-text>{{ text }}</v-card-text>
                            </v-card>
                        </v-tab-item>
                    </v-tabs-items>
                </v-card>
            </v-col> -->
    </v-row>
  </v-app>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import MenuInstituicao from '../../modules/core/MenuInstituicao.vue'

export default {
  name: 'PerfilPontoDeDoacao',
  components: { MenuInstituicao },
  props: ['id'],
  data() {
    return {
      menuShow: true,
      tab: null,
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut ' +
        'labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris' +
        ' nisi ut aliquip ex ea commodo consequat.',
    }
  },
  computed: {
    ...mapGetters({}),
  },
  created() {},

  methods: {
    ...mapActions({}),
  },
}
</script>

<style scoped>
.cover img {
  width: 100%;
}

.cover > a {
  display: inline-block;
  color: #e44d3a;
  font-size: 16px;
  background-color: #fff;
  border: 1px solid #e44d3a;
  position: absolute;
  top: 30px;
  right: 0;
  padding: 10px 15px;
  font-weight: 600;
  margin-right: 15px;
}

.cover > a i {
  padding-right: 5px;
}
</style>
