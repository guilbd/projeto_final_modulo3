# API Simpsons


<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/The_logo_simpsons_yellow.svg/800px-The_logo_simpsons_yellow.png" alt="imagem dos Simpsons" style="zoom:0%" />

> API criada para trabalho de conclusão de módulo na Blue Edtech, para conceitos de backend, utilizando a lisnguagem de programação JavaScript e o banco de dados MongoDB. Nessa API foi criado um CRUD completo de personagens da série "Os Simpsons".


Para utilizar o projeto faça o download do arquivo zip, ou faça o clone em seu computador utilizando o Git. Execute o comando `npm i` dentro da pasta do projeto em seu computador (a pasta que contém o arquivo packge.json), para baixar as dependencias do projeto.

## Executando o projeto

_Essa API utilizao o MongoDB como banco de dados e o Mongoose como ODM, então, antes de testar a API certifique-se de possuir o MongoDB instalado em seu computador (https://www.mongodb.com/pt-br)._

Além disso, você precisa criar o arquivo .env com a url do seu banco, _utilize o arquivo .env.example_ para criar o seu. Esse é um exemplo de string de conexão com o banco de dados: mongodb://localhost:27017/db_simpsons.

>Modelo .env

```script
DB_USER=<username>
DB_PASSWORD=<password>
DB_NAME=<nome_do_banco_de_dados>
DB_CHAR=<5_caracteres_apos_cluster>
```

>Modelo .env.example
``` bash
DB_USER = 
DB_PASSWORD = 
DB_NAME = 
DB_CHAR = 
```

Agora você pode executar o projeto:

- Para executar o projeto com o nodemon, digite no terminal:

```bash
npm run dev
```

- Para executar o projeto com o node, digite no terminal:

```bash
npm start
```

## Testando a API para

Você pode utilizar as ferramentas:

- Postman
- Insomnia
- Thunder Client (plugin VSCode)

## Exemplos de URLs:

* Essa é a URL de teste padrão: http://localhost:3000/personagens

* Para buscar por ID, Editar ou Apagar, insira o ID na URL: http://localhost:3000/personagens/5

* Para fazer uma busca com query string pelo nome, esse é um exemplo de URL: http://localhost:3000/filterByName?nome=Bart

* Para fazer uma busca com query string por qualquer um dos atrib, esse é um exemplo de URL: http://localhost:3000/filterAll?nome=Bart&familia=Simpsons&ocupacao=tecnico&epPrimeiraAparicao=good

* Nesse site você consegue encontrar informações de personagens para testar os end-points: https://simpsons.fandom.com/wiki/Simpsons_Wiki

Essa é a estrutura JSON para fazer o POST e o PUT:
```json

    {
      "nome": "Homer Jay Simpson",
      "familia": "Simpson",
      "ocupacao": "Técnico Nuclear",
      "epPrimeiraAparicao": "Episódio - Good Night",
      "imagem": "https://static.wikia.nocookie.net/simpsons/images/b/bd/Homer_Simpson.png"
    }
```