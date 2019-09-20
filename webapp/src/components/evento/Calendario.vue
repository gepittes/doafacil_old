<template>
    <v-row class="fill-height">
        <v-col>
            <v-sheet height="64">
                <v-toolbar flat color="white">
                    <v-btn outlined class="mr-4" @click="setToday">
                        Hoje
                    </v-btn>
                    <v-btn fab text small @click="prev">
                        <v-icon small>fas fa-arrow-left</v-icon>
                    </v-btn>
                    <v-btn fab text small @click="next">
                        <v-icon small>fas fa-arrow-right</v-icon>
                    </v-btn>
                    <v-toolbar-title>{{ title }}</v-toolbar-title>
                    <div class="flex-grow-1"></div>
                    <v-menu bottom right>
                        <template v-slot:activator="{ on }">
                            <v-btn
                                outlined
                                v-on="on"
                            >
                                <span>{{ typeToLabel[type] }}</span>
                                <v-icon small>fas fa-arrow-down</v-icon>
                            </v-btn>
                        </template>
                        <v-list>
                            <v-list-item @click="type = 'day'">
                                <v-list-item-title>Dia</v-list-item-title>
                            </v-list-item>
                            <v-list-item @click="type = 'week'">
                                <v-list-item-title>Semana</v-list-item-title>
                            </v-list-item>
                            <v-list-item @click="type = 'month'">
                                <v-list-item-title>Mês</v-list-item-title>
                            </v-list-item>
                            <v-list-item @click="type = '4day'">
                                <v-list-item-title>4 Dias</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-toolbar>
            </v-sheet>
            <v-sheet height="600">
                <v-calendar
                    ref="calendar"
                    v-model="focus"
                    color="primary"
                    :events="events"
                    :event-color="getEventColor"
                    :event-margin-bottom="3"
                    :now="today"
                    :type="type"
                    locale="Brazil"
                    @click:event="showEvent"
                    @click:more="viewDay"
                    @click:date="viewDay"
                    @change="updateRange"
                ></v-calendar>
                <v-menu
                    v-model="selectedOpen"
                    :close-on-content-click="false"
                    :activator="selectedElement"
                    full-width
                    offset-x
                >
                    <v-card
                        color="grey lighten-4"
                        min-width="350px"
                        flat
                    >
                        <v-toolbar
                            :color="selectedEvent.color"
                            dark
                        >
                            <v-btn icon>
                                <v-icon>fa fa-paper-plane</v-icon>
                            </v-btn>
                            <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                            <div class="flex-grow-1"></div>
                            <v-btn icon>
                                <v-icon>mdi-heart</v-icon>
                            </v-btn>
                            <v-btn icon>
                                <v-icon>mdi-dots-vertical</v-icon>
                            </v-btn>
                        </v-toolbar>
                        <v-card-text>
                            <span v-html="selectedEvent.details"></span>
                            <v-divider/>
                            Hora do evento: <span v-html="selectedEvent.hour" class="badge badge-info"></span> hrs
                        </v-card-text>
                        <v-card-actions>
                            <v-btn
                                text
                                color="secondary"
                                @click="selectedOpen = false"
                            >
                                Fechar
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-menu>
            </v-sheet>
        </v-col>
    </v-row>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: 'Calendario',
        data: () => ({
            today: new Date().toISOString().slice(0, 10),
            focus: new Date().toISOString().slice(0, 10),
            type: 'month',
            typeToLabel: {
                month: 'Mês',
                week: 'Semana',
                day: 'Dia',
                '4day': '4 Dias',
            },
            start: null,
            end: null,
            selectedEvent: {},
            selectedElement: null,
            selectedOpen: false,
            events: []
        }),
        computed: {
            ...mapGetters({
                eventos: 'evento/getEventosInsti'
            }),

            title() {
                const {start, end} = this
                if (!start || !end) {
                    return ''
                }

                const startMonth = this.monthFormatter(start)
                const endMonth = this.monthFormatter(end)
                const suffixMonth = startMonth === endMonth ? '' : endMonth

                const startYear = start.year
                const endYear = end.year
                const suffixYear = startYear === endYear ? '' : endYear

                const startDay = start.day + this.nth(start.day)
                const endDay = end.day + this.nth(end.day)

                switch (this.type) {
                    case 'month':
                        return `${startMonth} ${startYear}`
                    case 'week':
                    case '4day':
                        return `${startMonth} ${startDay} ${startYear} - ${suffixMonth} ${endDay} ${suffixYear}`
                    case 'day':
                        return `${startMonth} ${startDay} ${startYear}`
                }
                return ''
            },
            monthFormatter() {
                return this.$refs.calendar.getFormatter({
                    timeZone: 'UTC', month: 'long',
                })
            },
        },

        created() {
            this.eventos.forEach(e => {
                let data = {
                    name: e.nome,
                    start: e.data,
                    end: e.data,
                    details: e.descricao,
                    hour: e.hora,
                    color: this.random_rgba()
                };
                this.events.push(data)
            });
        },

        watch: {
            eventos(e) {
                this.events = [];

                if (e.length === 0) {
                    this.events = []
                }
                this.eventos.forEach(e => {
                    let data = {
                        name: e.nome,
                        start: e.data,
                        end: e.data,
                        details: e.descricao,
                        hour: e.hora,
                        color: this.random_rgba()
                    };
                    this.events.push(data)
                });
            }
        },

        methods: {

            random_rgba() {
                let colors = ['#03A9F4', '#E53935', '#4CAF50', '#009688', '#9C27B0', '#E040FB'];
                return  colors[Math.floor(Math.random() * colors.length)];
            },

            viewDay({date}) {
                this.focus = date
                this.type = 'day'
            },
            getEventColor(event) {
                return event.color
            },
            setToday() {
                this.focus = this.today
            },
            prev() {
                this.$refs.calendar.prev()
            },
            next() {
                this.$refs.calendar.next()
            },
            showEvent({nativeEvent, event}) {
                const open = () => {
                    this.selectedEvent = event
                    this.selectedElement = nativeEvent.target
                    setTimeout(() => this.selectedOpen = true, 10)
                }

                if (this.selectedOpen) {
                    this.selectedOpen = false
                    setTimeout(open, 10)
                } else {
                    open()
                }

                nativeEvent.stopPropagation()
            },
            updateRange({start, end}) {
                this.start = start
                this.end = end
            },
            nth(d) {
                return d > 3 && d < 21
                    ? 'th'
                    : ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'][d % 10]
            },
        },
    }
</script>