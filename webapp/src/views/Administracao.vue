<template>
  <v-container fluid>
    <v-card color="" >
      <v-toolbar dark color="primary">
        <v-toolbar-title>Adminstracao</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-layout justify-space-around>
          <v-flex xs5>
            <v-layout column>
              <v-card height="200px">

                {{bottomNav}}
                <v-bottom-nav
                        :active.sync="bottomNav"
                        :color="color"
                        :value="true"
                        absolute
                        shift
                >
                  <v-btn dark value="0">
                    <span>Video</span>
                    <v-icon>ondemand_video</v-icon>
                  </v-btn>

                  <v-btn dark>
                    <span>Music</span>
                    <v-icon>music_note</v-icon>
                  </v-btn>

                  <v-btn dark>
                    <span>Book</span>
                    <v-icon>book</v-icon>
                  </v-btn>

                  <v-btn dark>
                    <span>Image</span>
                    <v-icon>image</v-icon>
                  </v-btn>
                </v-bottom-nav>
              </v-card>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-card>
  </v-container>

</template>

<script>
    export default {
        data () {
            return {
                bottomNav: 3
            }
        },

        computed: {
            color () {
                switch (this.bottomNav) {
                    case 0: return 'blue-grey'
                    case 1: return 'teal'
                    case 2: return 'brown'
                    case 3: return 'indigo'
                }
            }
        }
    }
</script>
