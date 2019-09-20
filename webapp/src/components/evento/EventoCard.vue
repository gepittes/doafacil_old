<template>
    <div>
        <v-row justify="center">
            <v-dialog v-model="dialog" persistent max-width="300">
                <v-card>
                    <v-card-title class="headline text-center">Tem certeza que deseja deletar este evento?
                    </v-card-title>
                    <v-card-text>Você esta prestes a deletar o evento {{evento.nome}}
                    </v-card-text>
                    <v-card-actions>
                        <div class="flex-grow-1"></div>
                        <v-btn color="green darken-1" text @click="dialog = false">Cancelar</v-btn>
                        <v-btn color="red darken-1" text @click="deletarEvento(evento.id)">Sim, quero deletar!</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
        <v-card
            max-width="300"
        >
            <v-img
                height="100"
                src="https://dq5r178u4t83b.cloudfront.net/wp-content/uploads/sites/15/2016/08/29110503/meeting-event-wedding-ballroom-sofitel-the-palm-dubai201-585x390.jpg"
            ></v-img>

            <v-card-title>{{this.evento.nome}}</v-card-title>
            <v-card-text>
                <div>{{this.evento.descricao}}</div>
            </v-card-text>

            <v-divider class="mx-4 m-0"></v-divider>

            <v-card-text>
                <div class="title text--primary">Data e Hora do Evento</div>
                <v-chip color="green mr-3"><b class="white--text">{{this.evento.data}}</b></v-chip>
                <v-chip color="blue"><b class="white--text">{{this.evento.hora}} hrs</b></v-chip>
            </v-card-text>

            <v-card-actions>
                <v-btn
                    color="deep-purple accent-4"
                    text
                    @click="openMap"
                >
                    <v-icon>fa fa-map-marker-alt mr-2</v-icon>
                    Mapa do local
                </v-btn>
                <v-spacer/>
                <v-btn
                    v-if="this.$route.name === `eventos`"
                    icon
                    @click="editarEvento(evento)">
                    <v-icon>
                        edit
                    </v-icon>
                </v-btn>
                <v-btn
                    v-if="this.$route.name === `eventos`"
                    icon
                    @click="dialog = true">
                    <v-icon>
                        delete
                    </v-icon>
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'

    export default {
        name: 'eventoCard',
        props: ['evento'],
        data: () => ({
            selection: 1,
            dialog: false,
        }),

        methods: {
            ...mapActions({
                deletarEvento: 'evento/deletarEvento',
                eventoEditar: 'evento/eventoEditar',
                statusPnlCreate: 'evento/statusPnlCreate',
                visibleCreatePnlEvento: 'evento/visibleCreatePnlEvento'
            }),
            editarEvento(evento) {
                this.visibleCreatePnlEvento(true);
                this.statusPnlCreate(0);
                setTimeout(() => {
                    this.eventoEditar(evento);
                }, 800)
            },
            openMap() {
                //open Map event here!
            }
        },
    }
</script>