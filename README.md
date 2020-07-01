<p align="center">
  <a href="https://github.com/marlonconcenza" target="_blank"><img alt="I am Marlon Concenza" src="https://img.shields.io/badge/I%20am-Marlon_Concenza-informational"></a>
  <a href="https://github.com/marlonconcenza" target="_blank" ><img alt="Github" src="https://img.shields.io/badge/Github--%23F8952D?style=social&logo=github"></a>
  <a href="https://www.linkedin.com/in/marlon-martins-concenza-53738978" target="_blank" ><img alt="LinkedIn" src="https://img.shields.io/badge/Linkedin--%23F8952D?style=social&logo=linkedin"></a>
  <a href="mailto:marlon.concenza@gmail.com" target="_blank" ><img alt="Email" src="https://img.shields.io/badge/Email--%23F8952D?style=social&logo=gmail"></a>
</p>

## Sobre este projeto

API Restful com autenticação e administração de usuários.

- Autenticação com token JWT
- Configuração para acesso ao banco de dados [Postgres](https://www.postgresql.org)
- Configuração para deploy da apliação do [Heroku](https://www.heroku.com)

## Tecnologias utilizadas

- [NodeJS](https://nodejs.org)
- [TypeORM](https://typeorm.io)

## Configuração do ambiente de desenvolvimento

### Pré-requisitos

Para executar esse projeto no modo de desenvolvimento, você precisará basicamente de um ambiente com [NodeJS](https://nodejs.org/) instalado.

### Clonando o repositório

```bash
$ git clone https://github.com/marlonconcenza/security-api.git
```
### Instalando as dependências

No diretório do projeto, executar o comando:

```bash
$ npm install
```

### Executando as migrations no Postgres

Após a instalação do Postgres, a criação do banco de dados e a configuração da string de conexão através de variável de ambiente, no diretório do projeto, executar o comando:

```bash
$ npm run typeorm migration:run
```

Para configurar variáveis de ambiente, crie um arquivo na raiz do projeto com o nome **.env**, copie o conteúdo do arquivo **.env.example** e preencha os valores.

### Executando a aplicação

No diretório do projeto, executar o comando:

```bash
$ npm run start
```

Será inicializado o servidor de desenvolvimento, que pode ser acessado através do browser no endereço <http://localhost:3333>.
