<template>
    <v-container grid-list-md>
        <v-layout xs12  sm6 md6 align-center justify-center>
            <v-form  ref="form" lazy-validation @submit.prevent="salvar()">
                <v-flex left justify-center>
                        <v-text-field    
                                v-if="false"
                                v-model="instituicao.id"
                        label="id"/>
                        <v-text-field
                                required
                                v-model="instituicao.nome"
                                :rules="[rules.required, rules.minLength]"
                                label="Nome"/>
                                <div v-if="submitted && errors.has('nome')" class="invalid-feedback">
                                    {{ errors.first('nome') }}
                                </div>
                        <v-text-field
                                v-model="instituicao.telefone"
                                required
                                :rules="[rules.required, rules.telefone]"
                                label="Telefone"/>
                                <div v-if="submitted && errors.has('telefone')" class="invalid-feedback">
                                    {{ errors.first('telefone') }}
                                </div>
                        <v-select
                            required
                            :items="estado"
                            :rules="[rules.required]"
                            v-model="instituicao.uf"
                            label="Estados"
                        ></v-select>
                                <div v-if="submitted && errors.has('uf')" class="invalid-feedback">
                                    {{ errors.first('uf') }}
                                </div>
                </v-flex>
               <v-flex right>
                    <v-select 
                        required   
                        :rules="[rules.required]"                
                        :items="cidade"
                        v-model="instituicao.localidade"
                        label="Cidades"
                    ></v-select>
                            <div v-if="submitted && errors.has('localidade')" class="invalid-feedback">
                                {{ errors.first('localidade') }}
                            </div>
                    <v-text-field
                    v-model="instituicao.horario"
                    label="Horário Entrada:"
                    :rules="[rules.required]"
                    required
                    ></v-text-field>
                            <div v-if="submitted && errors.has('horario')" class="invalid-feedback">
                                {{ errors.first('horario') }}
                            </div>
                    <v-text-field
                    v-model="instituicao.banner"
                    label="Horário Saida"
                    required
                    :rules="[rules.required]"
                    ></v-text-field>
                            <div v-if="submitted && errors.has('banner')" class="invalid-feedback">
                                {{ errors.first('banner') }}
                            </div>
                </v-flex>
                             
                <div class="text-xs-center">
                        <v-btn
                            color="secundary"
                            type="cancel"
                            @click.native="close">Fechar
                        </v-btn>

                         <v-btn color="primary" type="submit">Salvar</v-btn>
                </div>
            </v-form>
        </v-layout>
    </v-container>
</template>

<script>
import axios from 'axios'
import { mapState, mapActions } from 'vuex';
import { constants } from 'crypto';

export default {
    name: 'NovaInstituicao',
    props: ['instituicaoEditar'],
    data() {
        return {
            submitted: false,
            instituicao: {},
            dialog: false,
            estados: [],    
            estado:[],
            cidades: [],
            rules: {
                required: value => !!value || 'Campo Obrigatório.',
                minLength: object => (object != null && object.length != null && object.length > 3) || 'Campo obrigatório.',
                telefone: value => {
                    // eslint-disable-next-line
                    const pattern = /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/;
                    return pattern.test(value) || "Telefone invalido.";
                }
            },
        }
    },
    computed: {
        cidade(){
            this.estados.forEach(e => {
                if(e.nome == this.instituicao.uf){
                    this.cidades = e.cidades
                }
            })
            return this.cidades
        }
    },
    created() {
        this.carregarEstados()
    },
    watch: {
        instituicaoEditar(value) {
            if ('error' in value) {
                alert(value.error);
                this.instituicao = {};
            } else {
                this.instituicao = value;
            }
        },
    },
    methods: {
        ...mapActions({
            cadastrarInstituicao: 'instituicao/cadastrarInstituicao',
            atualizarInstituicao: 'instituicao/atualizarInstituicao'
        }),

        reset() {
            this.instituicao =  {}
        }, 

        salvar(){
            this.submitted = true;
             
             // Validar formulário
            if (this.$refs.form.validate()) {

                // veririfica se o formulario está preenchido  para atualizar se não criando novo
                if(this.instituicao.id){
                 this.atualizarInstituicao(this.instituicaoEditar)
                } else {
                    this.cadastrarInstituicao(this.instituicao)
                }
                this.$emit('update:dialog', false);
                this.reset()
            }
        
   
        },  

        close() {
           this.reset()
           this.$emit('update:dialog', false)
        },
        async carregarEstados(){
           await  axios.get('https://gist.githubusercontent.com/letanure/3012978/raw/36fc21d9e2fc45c078e0e0e07cce3c81965db8f9/estados-cidades.json')
           .then(res => {
               this.estados = res.data.estados       
                this.estados.forEach(e => {
                    this.estado.push(e.nome)
                })
            
            })  
        },
    }
}
</script>
