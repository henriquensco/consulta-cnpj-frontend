<template>
  <div class="home">
    <div>
      <h2>Pesquisar CNPJ</h2>
      <div>
        <input v-model="cnpj" v-mask="'##.###.###/####-##'" type="text">
        <button @click="requestApi">Pesquisar</button>
      </div>

      <div v-if="avisos.ativo" id="aviso">
        {{ avisos.mensagem }}
      </div>

      <div v-if="tabs" class="tabs-component">
        <tabs cache-lifetime="10" :options="{ useUrlFragment: false, defaultTabHash: 'first-tab' }">
        <tab id="first-tab" name="Informações">
          <div v-for="info in resultado"
          v-bind:key="info.id">
            
            <div>
              {{info.cnpj}}
            </div>
          </div>
        </tab>
        <tab id="second-tab" name="Atividades Econômicas">
          Atividades Econômicas
        </tab>
        <tab id="third-tab" name="Sócios">
          Sócios
        </tab>
      </tabs>
      </div>

    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'Home',
  data() {
    return {
      cnpj: '',
      resultado: [],
      avisos: {
        ativo: null,
        mensagem: ''
      },
      tabs: false
    }
  },
  methods: {
    formatCnpj() {
      const cnpj = this.cnpj.replace(/[^\d]/g, '');
      return cnpj;
    },
    verifyErrors(cnpj) {
      if(cnpj.length == "" || cnpj.length < 14 || cnpj.length > 14) {
        this.avisos.ativo = true;
        this.avisos.mensagem = 'CNPJ Inválido';
        return true;
      }
      return false;
    },
    requestApi() {
      const cnpj = this.formatCnpj(this.cnpj);
      const error = this.verifyErrors(cnpj);
      if(error == false) {
        axios.get(`${process.env.VUE_APP_API_HOST}/${cnpj}`)
        .then((res)=>{
        const {data, statusCode} = res.data;
        if(statusCode == 200) {
          this.resultado.push(data);
          this.tabs = true;
        } else {
           this.tabs = false;
            this.avisos.ativo = true;
            this.avisos.mensagem = data.message;
          }
        });
        this.resultado.splice(0);
        this.avisos.ativo = false;
      }  
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#aviso {
  background-color: #ff8585;
  width: 40%;
  margin: 0 auto;
  margin-top: 5%;
  padding: 5px 5px;
  border-color:#000;
  border-radius: 3px;
}
</style>
