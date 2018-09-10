<template>
    <v-container fluid>
        <v-layout
                column
                justify-center
        >
            <v-card flat>
                <v-subheader>Plataformas</v-subheader>

                <v-expansion-panel popout>
                    <v-expansion-panel-content
                            v-for="(message, i) in messages"
                            :key="i"
                            hide-actions
                    >
                        <v-layout
                                slot="header"
                                align-center
                                row
                                spacer
                        >
                            <v-flex xs4 sm2 md1>
                                <v-avatar
                                        slot="activator"
                                        size="36px"
                                >
                                    <img
                                            v-if="message.avatar"
                                            :src="message.avatar"
                                            alt="Avatar"
                                    >
                                    <v-icon
                                            v-else
                                            :color="message.color"
                                            v-text="message.icon"
                                    ></v-icon>
                                </v-avatar>
                            </v-flex>

                            <v-flex sm5 md3 hidden-xs-only>
                                <strong v-html="message.name"></strong>
                                <span
                                        v-if="message.total"
                                        class="grey--text"
                                >
              &nbsp;({{ message.total }})
            </span>
                            </v-flex>

                            <v-flex no-wrap xs5 sm3>
                                <v-chip
                                        v-if="message.new"
                                        :color="`${message.color} lighten-4`"
                                        class="ml-0"
                                        label
                                        small
                                >
                                    {{ message.new }} new
                                </v-chip>
                                <strong v-html="message.title"></strong>
                            </v-flex>

                            <v-flex
                                    v-if="message.excerpt"
                                    class="grey--text"
                                    ellipsis
                                    hidden-sm-and-down
                            >
                                &mdash;
                                {{ message.excerpt }}
                            </v-flex>
                        </v-layout>

                        <v-card>
                            <v-divider></v-divider>
                            <v-card-text v-text="lorem"></v-card-text>
                        </v-card>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-card>
        </v-layout>
        <!--<v-card id="create">-->
            <!--<v-speed-dial>-->
                <!--<v-btn slot="activator"-->
                       <!--v-model="false"-->
                       <!--color="blue darken-2"-->
                       <!--dark-->
                       <!--fab>-->
                    <!--<v-icon>account_circle</v-icon>-->
                    <!--<v-icon>close</v-icon>-->
                <!--</v-btn>-->
                <!--<v-btn fab-->
                       <!--dark-->
                       <!--small-->
                       <!--color="green">-->
                    <!--<v-icon>edit</v-icon>-->
                <!--</v-btn>-->
                <!--<v-btn fab-->
                       <!--dark-->
                       <!--small-->
                       <!--color="indigo">-->
                    <!--<v-icon>add</v-icon>-->
                <!--</v-btn>-->
                <!--<v-btn fab-->
                       <!--dark-->
                       <!--small-->
                       <!--color="red">-->
                    <!--<v-icon>delete</v-icon>-->
                <!--</v-btn>-->
            <!--</v-speed-dial>-->
        <!--</v-card>-->
        <!--<v-btn-->
                <!--absolute-->
                <!--dark-->
                <!--fab-->
                <!--botto-->
                <!--right-->
                <!--color="pink"-->
        <!--&gt;-->
            <!--<v-icon>add</v-icon>-->
        <!--</v-btn>-->
    </v-container>

</template>
<script>
    export default {
        data: () => ({
            bottomNav: 'recent',
            messages: [
                {
                    avatar: 'https://cdn.icon-icons.com/icons2/936/PNG/512/mobile-phone_icon-icons.com_73484.png',
                    name: 'Celular',
                    title: 'Celular Título',
                    excerpt: 'Celular descrição'
                },
                {
                    avatar: 'https://image.flaticon.com/icons/svg/49/49918.svg',
                    name: 'Web',
                    title: 'Web Título',
                    excerpt: 'Web descrição'
                },
                {
                    color: 'red',
                    icon: 'people',
                    name: 'Email',
                    new: 1,
                    total: 3,
                    title: 'Email Título'
                },
            ],
            lorem: 'Lorem ipsum dolor sit amet, at aliquam vivendum vel, everti delicatissimi cu eos. Dico iuvaret debitis mel an, et cum zril menandri. Eum in consul legimus accusam. Ea dico abhorreant duo, quo illum minimum incorrupte no, nostro voluptaria sea eu. Suas eligendi ius at, at nemore equidem est. Sed in error hendrerit, in consul constituam cum.'
        })
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
