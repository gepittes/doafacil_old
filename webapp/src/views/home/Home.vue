<template>
    <v-app light>
        <BackTop/>

        <Fachada
            :img-paralax="images.main"
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
    import Fachada from '@/components/home/FachadaHome.vue'
    import InfoCards from '@/components/home/InformacoesCards.vue'
    import GenericComp from '@/components/home/GenericComp.vue'
    import News from '@/components/home/NewsLetter.vue'
    import Social from '@/components/home/RedesSociais.vue'
    import CompInfo from '@/components/home/InfoCompany.vue'
    import Footer from '@/modules/core/Footer.vue'
    import BackTop from "../../components/home/BackTop";

    export default {
        name: "Home",
        data: function () {
            return {
                images: {
                    main: require('@/assets/home/union-hands.jpg'),
                    logo: require('@/assets/doafacil/logos/logo-doafacil.png'),
                }
            };
        },
        components: {BackTop, InfoCards, Social, Footer, CompInfo, Fachada, News, GenericComp},
    };
</script>

