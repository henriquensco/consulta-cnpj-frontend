
# Consulta CNPJ - VueJS
Aplicação desenvolvida com VueJS para consultar dados de CNPJ fazendo requisição à API da [Brazil Api](https://github.com/BrasilAPI/BrasilAPI) por meio de outra API intermediadora desenvolvida com Laravel.

## Pacotes Utilizados
- [Axios](https://github.com/axios/axios) - Utilizada para fazer a requisição à API intermediária, facilitando o desenvolvimento do projeto e comunicação com o backend.
- [vue-tabs-component](https://github.com/spatie/vue-tabs-component) - Componente que simplifica a criação de tabs, o que tornou o desenvolvimento e navegação das tabs entre os dados mais interessantes.

## Instalação do Projeto

Use the package manager [pip](https://pip.pypa.io/en/stable/) to install foobar.

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

## Executando no aplicação no Docker
Criando container Docker
~~~~
docker build -t consulta-cnpj/docker-vuejs .
~~~~
Executando API via Docker
~~~~
docker run -it -p 8080:80 consulta-cnpj/docker-vuejs
~~~~
