# MVC_Com Node
    
## Tecnologies
   - NodeJs
   - Express
   - Sequelize
   - Mysql

## Requeriment:
- NodeJS
- MySql

## How to Run:
```console
$ npm run install      # install dependencies
$ npm run create-db    # create the database
$ npm run migrate-db   # create database's tables
$ npm run dev          # start server

Criar ADM Ao Rodar Rota http://localhost:3000/novoadm (rota tipo POST)
```

## Routes
```
Rota padrão: http://localhost:3000

Criar ADM Ao Rodar Rota http://localhost:3000/novoadm (rota tipo POST)

- GET
1. /
2. /users, Retorna todos os usuários, apenas para o adm.
3. /users/:id, Retorna usuários por id.
4. /tasks, Retorna todas as tasks, apenas para o adm.
5. /tasklist, Retorna por usuários, apenas para usuário logado.
5. /tasks/:id, Retorna task por id, apenas para usuário logado.

- POST
1. /login, Autentica usuário.
2. /newuser, Cria novo usuários, apenas para o adm.
2. /newtask, Cria nova task, apenas para usuário logado.

- PUT
1. /tasks/:id, Edita taks, apenas para usuário logado.

- DELETE
1. /tasks/:id, Remove taks, apenas para usuário logado.
```

## Developers:
- Suelen Batista [GitHub](https://github.com/sue1en)