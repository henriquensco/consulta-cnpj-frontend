<template>
  <div class="home">
    <div>
      <div id="left">
        <div id="texts">
          <h1>Olá, está procurando uma empresa?</h1>
          <h4>Temos todoas as Informações que você precisa por apenas algumas teclas de distância.</h4>
        </div>
        <div id="search_cnpj">
          <h5>Digite o CNPJ para saber mais</h5>
          <input v-model="cnpj" v-mask="'##.###.###/####-##'" type="text">
          <div>
            <button @click="requestApi">Pesquisar</button>
          </div>
        </div>
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
#left {
  margin: 5% 2%;
  width: 40%;
  float: left;
}
h4 {
  margin: 9%;
}
#search_cnpj input{
  background-color: rgb(22, 22, 22);
  padding: 8px 5px;
  width: 60%;
  border: none;
  border-radius: 2px;
  color:rgb(253, 253, 253);
  font-weight: bold;
}
#search_cnpj button{
  background-color: rgb(15, 139, 31);
  padding: 8px 5px;
  width: 35%;
  margin-top: 10%;
  border: none;
  border-radius: 3px;
  font-weight: bold;
  color:rgb(253, 253, 253);
  cursor: pointer;
}
#aviso {
  width: 10%;
  margin: 0 auto;
  background-color: rgb(230, 31, 31);
  border-color:#000;
  padding: 7px 7px;
  border-radius: 3px;
  position: relative;
  animation-name: animacao;
  animation-duration: 0.5s;
}
@keyframes animacao {
  0%  {padding: 2px 2px; opacity: 0;}
  50%  {padding: 3px 3px; opacity: 0.5;}
  100% {padding: 7px 7px; opacity: 1;}
}
</style>
