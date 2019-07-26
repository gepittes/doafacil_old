<template>
    <v-app light>

        <Fachada
                :img-paralax="images.main"
                :gif-mascote="images.logoGif"
        />

        <InfoCards/>

        <GenericComp
                :img-paralax="images.main"
        />

        <News/>

        <Social :image="images.main"/>

        <CompInfo/>

        <Footer/>

    </v-app>
</template>

<script>
    import Fachada from '../../modules/home/FachadaHome.vue'
    import InfoCards from '../../modules/home/InformacoesCards.vue'
    import GenericComp from '../../modules/home/GenericComp.vue'
    import News from '../../modules/home/NewsLetter.vue'
    import Social from '../../modules/home/RedesSociais.vue'
    import CompInfo from '../../modules/home/InfoCompany.vue'
    import Footer from '../../modules/core/Footer.vue'

    export default {
        name: "Home",
        data: function () {
            return {
                images: {
                    main: require('../../assets/home/union-hands.jpg'),
                    logo: require('../../assets/doafacil/logos/logo-doafacil.png'),
                    logoGif: require('../../assets/doafacil/gifs/hand-gif.gif')
                },
            };
        },
        components: {InfoCards, Social, Footer, CompInfo, Fachada, News, GenericComp},
    };
</script>

