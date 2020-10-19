<h1 align="center">
<br>
    <img src="./github/logo.png" alt="Gobarber">
    <br>
    <br>
    🚀 GoBarber Api
</h1>

<div align="center">
    <img src="https://img.shields.io/static/v1?label=made_by&message=Sergio_Santiago&color=rgb(255,144,0)&style=<STYLE>&logo=<LOGO>"/>
    <img src="https://img.shields.io/static/v1?label=language&message=typescript&color=rgb(255,144,0)&style=<STYLE>&logo=<LOGO>"/>
    <img src="https://img.shields.io/static/v1?label=last_commit&message=october&color=rgb(255,144,0)&style=<STYLE>&logo=<LOGO>"/>
    <img src="https://img.shields.io/static/v1?label=license&message=MIT&color=rgb(255,144,0)&style=<STYLE>&logo=<LOGO>"/>
</div>


<h1> 📷 Projeto</h1>
<b>API que serve os dados para a aplicação GoBarber.</b>


## 🚀 Tecnologias

Esse projeto foi desenvolvido utilizando as seguintes tecnologias:

- ✔ Typescript

- ✔ NodeJS

- ✔ Postgres

- ✔ MongoDB

- ✔ Redis

- ✔ Date-fns

- ✔ Eslint

- ✔ Prettier

- ✔ Jest

<br>

## ℹ Como usar

Para clonar e rodar essa aplicação, você precisará de ter instalado o <a href="https://git-scm.com/">Git</a>, <a href="https://nodejs.org/en/">NodeJS</a> e o <a href="https://yarnpkg.com/">Yarn</a> instalados em seu computador. Eu recomendo fortemente o uso do Docker para executar os bancos de dados. Se você decidir usar o docker, siga estas etapas para instalar e executar as imagens do docker.

```bash
# instalação da imagem do Redis
$ docker run --name imageName -p 6379:6379 -d -t redis: alpine

# instalação da imagem do MongoDB
$ docker run --name imageName -p 27017:27017 -d -t mongo

# instalação da imagem do postgres(se você não especificar um nome de usuário, será postgres por padrão)
$ docker run --name imagename -e POSTGRES_PASSWORD = yourPassword -p 5432:5432 -d postgres

# start Redis
$ docker start imageName

# start MongoDB
$ docker start imageName

# start Postgres
$ docker start imageName
```

Após as instalações rode os seguintes comandos no terminal:

```bash
# Clone o repositório
$ git clone https://github.com/SergioSantiag0/GoBarber-frontend

# Entre no repositório
$ cd GoBarber-frontend

# Instale as dependências
$ yarn install
```

Para se conectar ao banco de dados, você precisará inserir as informações de acesso em um arquivo .env, baseado em um arquivo .env.example que é fornecido na pasta backend, alterar as variáveis ​​de acordo com seu ambiente e criar um arquivo ormconfig.json na raiz do projeto e inserir suas credênciais do postgres.

```bash
# Rode as migrations
$ yarn typeorm migration:run

# Rode a api
$ yarn dev:server
```

A aplicação foi desenvolvida utilizando TDD e testes unitários

```bash
# Rode os testes
$ yarn test
```

<h1> 📑 Licença</h1>
<b>Este projeto está sob a licença MIT. Veja a <a href="https://github.com/SergioSantiag0/GoBarber-FullStack/blob/master/LICENSE">LICENÇA</a> para mais informações</b>

<br>
<hr>
<p>Feito com ❤ por Sérgio Santiago 👏 <a href="https://www.linkedin.com/in/s%C3%A9rgio-santiago-16427217a/">Entre em contato!</a><p>
