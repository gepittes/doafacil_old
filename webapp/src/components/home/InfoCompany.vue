<template>
  <section>
    <v-layout class="my-5" color="white" id="sobre">
      <v-flex>
        <v-container>
          <v-layout align-center justify-center row>
            <v-flex xs12 md4>
              <v-card class="elevation-0 transparent">
                <v-card-text class="layout justify-center">
                  <v-img :src="imgs.gepitees" :max-width="200" />
                </v-card-text>
                <v-card-title primary-title class="layout justify-center">
                  <div
                    class="font-weight-bold headline text-xs-center text-uppercase"
                  >
                    GEPITEES
                  </div>
                </v-card-title>
                <v-card-text class="layout justify-center">
                  Grupo de Estudo e Pesquisa em Inovação e Tecnologia | UNIDESC
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs12 md4>
              <v-card class="elevation-0 transparent">
                <v-card-text class="text-xs-center layout justify-center">
                  <v-img :src="imgs.doafacil" :max-width="300" />
                </v-card-text>
                <v-card-title primary-title class="layout justify-center">
                  <div
                    class="font-weight-bold headline text-xs-center text-uppercase"
                  >
                    DOAFACIL
                  </div>
                </v-card-title>
                <v-card-text class="t-justify layout justify-center">
                  O Doa Fácil objeto deste estudo, é um sistema web que pretende
                  atender instituições filantrópicas de Brasília e entorno,
                  criando para estas instituições uma página web de hospedagem
                  gratuita, para nela, disponibilizar informações sobre a
                  entidade, formas de doação, necessidades, divulgação do
                  trabalho realizado pelas mesmas.
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </section>
</template>

<script>
export default {
  name: 'InfoCompany',
  data() {
    return {
      imgs: {
        doafacil: require('../../assets/doafacil/logos/logo-doafacil.png'),
        gepitees: require('../../assets/doafacil/logos/logo-gepitees.png'),
      },
    }
  },
}
</script>
