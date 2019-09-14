<template>
    <v-card
        max-width="300"
    >
        <v-img
            height="100"
            src="https://dq5r178u4t83b.cloudfront.net/wp-content/uploads/sites/15/2016/08/29110503/meeting-event-wedding-ballroom-sofitel-the-palm-dubai201-585x390.jpg"
        />
        <v-card-title v-text="ponto.nome"/>
        <v-card-text>
            <div>{{ ponto.descricao }}</div>
        </v-card-text>

        <v-divider class="mx-4 m-0"/>

        <v-card-text>
            <div class="title text--primary">Horário</div>
            <p>Abre <strong>{{ ponto.hora_open }}</strong> e fecha ás <strong>{{ ponto.hora_close }}</strong> </p>
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
            <v-btn icon>
                <v-icon>
                    edit
                </v-icon>
            </v-btn>
            <v-btn icon>
                <v-icon>
                    delete
                </v-icon>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    name: 'PontoCard',
    props: ['ponto'],
    data: () => ({
        selection: 1,
    }),

    methods: {
        openMap() {
            // open Map event here!
        },
    },
};
</script>
