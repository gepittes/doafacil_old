<template>

    <div id="perfil">
        <b-container>
            <section class="cover">
                <img
                    src="http://via.placeholder.com/1600x400"
                    alt="">
            </section>
            <div class="row">
                <div class="col-lg-3">
                    <div class="left-sidebar">
                        <div>
                            <div class="user-pro-img">
                                <img
                                    src="http://via.placeholder.com/170x170"
                                    alt="">
                            </div>
                        </div>
                  
						<menu-instituicao/>
                    
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="main-sty">
                        <div class="user-tab-sec">
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
                        </div>

                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="right-sidebar">
                        <div class="justify-content-end pb-4" >
                            <v-btn
                                class="ma-2"
                                color="error">
                                <v-icon>fa-envelope </v-icon><strong>Contato</strong>
                            </v-btn>
                            <v-btn
                                class="ma-2"
                                color="success" >
                                solicito
                            </v-btn>
                        </div>
                        <div class="widget widget-portfolio">
                            <div class="heady">
                                <h3>Pessoa que Doaram </h3>
                                <v-icon right>favorite</v-icon>
                            </div>
                            <div class="user-gallery">
                                <ul>
                                    <li><a
                                        href="#"
                                        title=""><img
                                            src="http://via.placeholder.com/70x70"
                                            alt=""></a></li>
                                    <li><a
                                        href="#"
                                        title=""><img
                                            src="http://via.placeholder.com/70x70"
                                            alt=""></a></li>
                                    <li><a
                                        href="#"
                                        title=""><img
                                            src="http://via.placeholder.com/70x70"
                                            alt=""></a></li>
                                    <li><a
                                        href="#"
                                        title=""><img
                                            src="http://via.placeholder.com/70x70"
                                            alt=""></a></li>
                                    <li><a
                                        href="#"
                                        title=""><img
                                            src="http://via.placeholder.com/70x70"
                                            alt=""></a></li>
                                    <li><a
                                        href="#"
                                        title=""><img
                                            src="http://via.placeholder.com/70x70"
                                            alt=""></a></li>
                                    <li><a
                                        href="#"
                                        title=""><img
                                            src="http://via.placeholder.com/70x70"
                                            alt=""></a></li>
                                    <li><a
                                        href="#"
                                        title=""><img
                                            src="http://via.placeholder.com/70x70"
                                            alt=""></a></li>
                                    <li><a
                                        href="#"
                                        title=""><img
                                            src="http://via.placeholder.com/70x70"
                                            alt=""></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </b-container>
    </div>
</template>
<script>
import MenuInstituicao from '../../modules/core/MenuInstituicao';
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'perfilInstituicao',
    components: { MenuInstituicao },
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
        this.buscarInstituicoe(this.$route.params.id);
    },
    computed: {
        ...mapGetters({
            instituicao: 'instituicao/getInstiEncontrada',
        }),
    },
    methods: {
        ...mapActions({
            obterInstituicoes: 'instituicao/obterInstituicoes',
            buscarInstituicoe : 'instituicao/buscartInstituicao'
        }),
    },
};
</script>

<style scoped>

	.user-pro-img {
		float: left;
		width: 100%;
		text-align: center;
		margin-top: -95px;
		position: relative;
	}
	.user-pro-img > a {
		width: 40px;
		height: 40px;
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

	.flw-hr li {
		display: inline-block;
		margin-right: 17px;
	}

	.flw-hr li:last-child {
		margin-right: 0;
	}

	.flw-hr li a {
		display: inline-block;
		color: #ffffff;
		font-size: 16px;
		font-weight: 600;
		padding: 11px 15px;
	}

	.flw-hr li a i {
		padding-right: 5px;
	}

	.left-sidebar {
		float: left;
		width: 100%;
		margin-top: -20px;
	}

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

	/* =================== main-sty ================== */

	.main-sty {
		float: left;
		width: 100%;
	}

	/* =============== right-sidebar ============= */

	.right-sidebar {
		float: left;
		width: 100%;
	}
	.widget {
		float: left;
		width: 100%;
		background-color: #fff;
		border-left: 1px solid #e4e4e4;
		border-right: 1px solid #e4e4e4;
		border-bottom: 1px solid #e4e4e4;
		margin-bottom: 20px;
		-webkit-box-shadow: 1px 0px 2px rgba(0,0,0,0.24);
		-moz-box-shadow: 1px 0px 2px rgba(0,0,0,0.24);
		-ms-box-shadow: 1px 0px 2px rgba(0,0,0,0.24);
		-o-box-shadow: 1px 0px 2px rgba(0,0,0,0.24);
		box-shadow: 1px 0px 2px rgba(0,0,0,0.24);
	}

	.widget-about img {
		float: none;
		padding-top: 20px;
	}
	.widget-about h3 {
		color: #000000;
		font-size: 20px;
		font-weight: 600;
		margin-bottom: 12px;
	}
	.widget-about span {
		color: #686868;
		font-size: 14px;
		margin-bottom: 30px;
		float: left;
		width: 100%;
	}

	.sign_link h3 {
		color: #000000;
		font-size: 18px;
		font-weight: 600;
		margin-bottom: 5px;
		text-transform: uppercase;
	}
	.sign_link h3 a {
		color: #000;
	}
	.sign_link > a {
		display: inline-block;
		color: #e44d3a;
		font-size: 14px;
		font-weight: 500;
	}
	.sign_link > a:hover {
		color: #e44d3a;
	}

	/* ============== widget-portfolio ============== */

	.heady {
		float: left;
		width: 100%;
		padding: 20px 20px;
		border-bottom: 1px solid #e5e5e5;
	}

	.heady h3 {
		color: #000000;
		font-size: 18px;
		font-weight: 700;
		float: left;
	}

	.heady img {
		float: right;
	}

	.user-gallery {
		float: left;
		width: 100%;
		padding: 15px 15px;
	}

	.user-gallery ul {
		float: left;
		width: 100%;
	}

	.user-gallery ul li {
		float: left;
		width: 33.33%;
		padding: 5px;
		overflow: hidden;
	}
	.user-gallery ul li:hover {
		-webkit-transform: scale(1.2);
		-moz-transform: scale(1.2);
		-ms-transform: scale(1.2);
		-o-transform: scale(1.2);
		transform: scale(1.2);
	}

	.user-gallery img {
		width: 100%;
	}



</style>

