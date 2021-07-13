<template>
  <div class="home">
    <div>
      <h2>Pesquisar CNPJ</h2>
      <div>
        <input v-model="cnpj" v-mask="'##.###.###/####-##'" type="text">
        <button @click="requestApi">Pesquisar</button>
      </div>

      <div v-if="aviso" id="aviso">
        CNPJ Incorreto
      </div>

      <div class="tabs-component">
        <tabs cache-lifetime="10" :options="{ useUrlFragment: false, defaultTabHash: 'first-tab' }">
        <tab id="first-tab" name="Informações">
          <div v-for="info in resultado"
          v-bind:key="info">
            <div v-if="info.data.type == 'not_found' || info.data.type == 'bad_request'">
              {{ info.data.message }}
            </div>
            <div v-else>
              <div>
                <span>Nome da empresa</span>
                <br>
                <span>{{ info.data.razao_social }}</span>
              </div>

              <div>
                <span>CNPJ da empresa</span>
                <br>
                <span>{{ info.data.cnpj }}</span>
              </div>
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
      cnpj: "",
      resultado: [],
      aviso: null
    }
  },
  methods: {
    requestApi: function() {
      var cnpj = this.cnpj.replace(/[^\d]/g, '');
      if(cnpj == "" || cnpj.length < 14 || cnpj.length > 14) {
        this.aviso = true;
      } else {
        axios.get("http://localhost:8000/api/"+cnpj)
        .then((res)=>{
          this.resultado.push(res);
        });
        this.resultado.splice(0);
        this.aviso = null;
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
