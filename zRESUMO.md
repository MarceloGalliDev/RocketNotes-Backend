1.PASSO
    - Back-End em NODE
        - Criando server.js
            - Arquivo principal para executar o servidor
            - Usando o express, (requisições HTTP)
            - Status Code
            - Tratamento de exceções (middleware)
        - Criando as routes
            - Criando os Controllers
                - Rota para cada controller
                    - Controler tem que ter no máximo 5 ações, como exemplo:
                        - index
                        - show
                        - create
                        - delete
                        - update
                - Criar métodos de controller
                - Criar o banco de dados
                    - SQLite usando o knex
                    - Criar Knex.js
                        - Estrutura de tables
                            - relacionamentos
                            - chaves primária e estrangeira 
                            - manipular os dados
                                - insert
                                - delete
                                - select
                                - update

2.PASSO
    - Criar controllers de authenticated
    - Criar SessionsController para realizar o controle de sessão de autenticação

3.PASSO
    - criação de middleware
    - teste de authenticated e criação de arquivo de configs/auth

4.PASSO
    - criação de tmp para upload de arquivos
    - criação dos providers