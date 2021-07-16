<template>
  <div class="home">
    <div id="svg"></div>

    <div v-if="popup" class="tabs-component">
        <span id="close" @click="closePopup">X</span>
        <tabs cache-lifetime="10" :options="{ useUrlFragment: false, defaultTabHash: 'first-tab' }">
          
          <tab id="first-tab" name="Informações">
            <div v-for="info in resultado"
            v-bind:key="info.id">
              
              <div id="razao_social">
                <span>Nome empresarial:</span>
                <br>
                {{info.razao_social}}
              </div>

              <div id="num_inscricao">
                <span>Número da inscrição:</span>
                <br>
                {{info.cnpj}} - {{info.descricao_matriz_filial}}
              </div>

              <div id="data_abertura">
                <span>Data de abertura:</span>
                <br>
                {{info.data_inicio_atividade}}
              </div>

              <div id="endereco">
                <span>Logradouro: {{info.logradouro}}</span>
                <br>
                <span>Número: {{info.numero}}</span>    
                <br>

                <span>CEP: {{info.cep}}</span>             

                <span>Bairro: {{info.bairro}}</span>   

                <span>Municipio: {{info.municipio}}</span>

                <span>UF: {{info.uf}}</span>             
              </div>

              <div id="contato">
                <span>Telefone:</span>
                <br>
                {{info.ddd_telefone_1}}
              </div>

              <div id="capital_social">
                <span>Capital Social:</span>
                <br>
                {{info.capital_social}}
              </div>

            </div>
          </tab>

          <tab id="second-tab" name="Atividade Econômica">
            <table v-for="items in resultado" :key="items.id">

              <thead>
                <th>Código</th>
                <th>Descrição</th>
              </thead>

              <tbody v-for="item in items.cnaes_secundarias" :key="item.id">
                <td>{{item.codigo}}</td>
                <td>{{item.descricao}}</td>
              </tbody>

            </table>
          </tab>
          <tab id="third-tab" name="Sócios">
            <table v-for="socios in resultado" :key="socios.id">

              <thead>
                <th>Nome</th>
                <th>CPF Representante</th>
              </thead>

              <tbody v-for="socio in socios.qsa" :key="socio.id">
                <td>{{socio.nome_socio}}</td>
                <td>{{socio.cpf_representante_legal}}</td>
              </tbody>

            </table>
          </tab>
        </tabs>
      </div>

    <div>
      <div id="left">
        <div id="texts">
          <h1>Olá, está procurando uma empresa?</h1>
          <h4>Temos todos as Informações que você precisa por apenas algumas teclas de distância.</h4>
        </div>
        <div id="search_cnpj">
          <h5>Digite o CNPJ para saber mais</h5>
          <input v-model="cnpj" v-mask="'##.###.###/####-##'" type="text">
          <div>
            <button @click="requestApi">PESQUISAR</button>
          </div>
        </div>
      </div>

      <div v-if="avisos.ativo" id="aviso">
        {{ avisos.mensagem }}
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
      popup: false
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
          this.popup = true;
        } else {
           this.popup = false;
            this.avisos.ativo = true;
            this.avisos.mensagem = data.message;
          }
        });
        this.resultado.splice(0);
        this.avisos.ativo = false;
      }  
    },
    closePopup() {
      this.popup = false;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#svg {
  background: url('../assets/Innovation-amico.svg') no-repeat;
  background-size: 100% 100%;
  position:absolute;
  width: 50%;
  height: 60%;
  margin: 6% 50%;
}
#left {
  margin: 5% 2%;
  width: 40%;
  float: left;
}

h4, h3 {
  margin: 9%;
  font-style: Sora;
}
#search_cnpj input{
  background-color: #1E1E1E;
  padding: 8px 5px;
  width: 60%;
  border: none;
  border-radius: 2px;
  color:rgb(253, 253, 253);
  font-weight: bold;
}
#search_cnpj button{
  background-color: #058C5C;
  padding: 8px 5px;
  width: 35%;
  margin-top: 10%;
  border: none;
  border-radius: 3px;
  font-weight: bold;
  color:rgb(253, 253, 253);
  cursor: pointer;
}

#search_cnpj button:active {
  background-color: #05744f;
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
