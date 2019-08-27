<template>
        <b-container class="container">
            <div class="row">
                <div class="col-lg-3">
                    <div class="left-sidebar">
                        <div id="avatar">
                            <div class="user-pro-img">
                                <img
                                    src="http://via.placeholder.com/150x150"
                                    alt="">
                            </div>
                        </div>
                
                        <menu-instituicao/>
                    
                    </div>
                </div>
                <div class="col-lg-7">
                    <div class="main">
                        <div class="user-tab-sec">
                                <!-- main -->
                        </div>

                    </div>
                </div>
            </div>
        </b-container>
</template>
<script>
import MenuInstituicao from '../modules/core/MenuInstituicao'
import { mapGetters, mapActions } from 'vuex'

export default {
    components: { MenuInstituicao },
    props: ['id'],
    data() {
        return {
            menuShow:true,
            tab: null,
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut ' +
                        'labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris' +
                        ' nisi ut aliquip ex ea commodo consequat.',
        };
    },

    created() {
        this.obterInstituicoes();
    },
    computed: {
        ...mapGetters({
            instituicoes: 'instituicao/instituicao',
        }),
        instituicao() {
            return this.instituicoes.find(e => e.id === this.id);
        },
    },
    methods: {
        ...mapActions({
            obterInstituicoes: 'instituicao/obterInstituicoes',
        }),
    },
};
</script>

<style  scoped>
    .container {
        width: 1020px;
    }

    @media (max-width: 500px) {
        #avatar { display: none; }
        #avatar { display: none; }

    }
    .user-pro-img {
        float: left;
        width: 100%;
        text-align: center;
        position: relative;
    }
    .user-pro-img > a {
        width: 30px;
        height: 30px;
        -webkit-border-radius: 100px;
        -moz-border-radius: 100px;
        -ms-border-radius: 100px;
        -o-border-radius: 100px;
        border-radius: 100px;
        color: #fff;
        line-height: 40px;
        background-color: #e44d3a;
        position: absolute;
        top: 0;
        left: 60%;
    }

    .user-pro-img img {
        -webkit-border-radius: 100px;
        -moz-border-radius: 100px;
        -ms-border-radius: 100px;
        -o-border-radius: 100px;
        border-radius: 100px;
        float: none;
        border: 5px solid #fff;
    }

    .left-sidebar {
        float: left;
        width: 180 px;
    }

    .cover img {
        width: 100%;
    }


    /* =================== main ================== */

    .main{
        float: left;
        width: 100fr;
    }


</style>

