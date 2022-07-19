<h1 align="center">FPF - Desafio técnico</h1>

## Descrição do Projeto
<p align="center">Sistema para gerenciar os cadastros de projetos, seu tempo de duração e realizar uma simulação do cálculo de retorno do investimento.</p>


## Telas do projeto

### Tela principal

<img src="./project_images/tela_tabela_dinamica_edit.PNG">

### Tela para cadastro de novos projetos

<img src="./project_images/tela_new_project.PNG">

### Modal para confirmar exclusão do projeto

<img src="./project_images/tela_dialog_delete.PNG">

### Modal pós exclusão do projeto

<img src="./project_images/tela_dialog_project_deleted.PNG">

### Modal de cancelamento do exclusão do projeto

<img src="./project_images/tela_dialog_delete_cancel.PNG">

### Modal para simulação do ROI

<img src="./project_images/tela_dialog.PNG">

### Modal para mostrar o valor do ROI

<img src="./project_images/tela_dialog_roi.PNG">

### Modal de erro quando o valor do investimento for menor que a do projeto

<img src="./project_images/tela_dialog_erro.PNG">


## Tecnologias utilizadas
- [Node.js](https://nodejs.org/en/)
- [PostgreSQL](https://www.postgresql.org/)
- [React](https://pt-br.reactjs.org/)
- [Knex.js](http://knexjs.org/)
- [Bootstrap](https://getbootstrap.com/)

## Pré-requisitos e como rodar a aplicação
Antes de começar, você vai precisar ter intalado em sua máquina as seguintes ferramentas:

- Node.js
- PostgreSQL
- React

Após ter as instalações, crie um banco chamado "project_db" e depois siga os passo abaixo:

### Caso seja necessário altere as credenciais para o acesso ao banco de dados neste arquivo knexfile.js na pasta backend/

### Clone este repositório
$ git clone <https://github.com/patricksouza/fpf_desafio.git>

### Acesse a pasta do projeto via terminal/cmd
$ cd fpf_desafio

# Frontend

### Vá para a pasta frontend/
$ cd frontend/

### Instale as dependências
$ npm i ou npm install

### Execute a aplicação
$ npm start

## A aplicação iniciará na porta:3000 - acesse <http://localhost:3000>

# Backend

### Vá para a pasta backend/

$ cd backend/

### Instale as dependências

$ npm i ou npm install

### Execute a migration (Para criar a tabela no banco de dados)

$ npm run migrate 

### Execute a api 

$ npm start

## A api iniciará na porta:3334 - acesse <http://localhost:3334>
