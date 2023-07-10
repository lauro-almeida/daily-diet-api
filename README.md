Nesse desafio desenvolveremos uma API para controle de dieta diária, a Daily Diet API.


[x] Deve ser possível criar um usuário
    [x] Teste da rota de criação de usuário
[x] Deve ser possível identificar o usuário entre as requisições
    [] Teste da rota de autenticação de usuário
[x] Deve ser possível registrar uma refeição feita, com as seguintes informações:
    [x] Teste da rota de criação de refeição
    *As refeições devem ser relacionadas a um usuário.*
    - Nome
    - Descrição
    - Data e Hora
    - Está dentro ou não da dieta
[x] Deve ser possível editar uma refeição, podendo alterar todos os dados acima
    [] Teste da rota de edição de uma refeição
[x] Deve ser possível apagar uma refeição
    [x] Teste da rota de exclusão de uma refeição
[x] Deve ser possível listar todas as refeições de um usuário
    [x] Teste da rota de listagem de todas as refeições
[x] Deve ser possível visualizar uma única refeição
    [x] Teste da rota de listagem de uma refeição
[x] Deve ser possível recuperar as métricas de um usuário
    [x] Teste da rota de métricas
        [x] - Quantidade total de refeições registradas
        [x] - Quantidade total de refeições dentro da dieta
        [x] - Quantidade total de refeições fora da dieta
        [x] - Melhor sequência de refeições dentro da dieta


Tabelas necessárias no bd:
usuários: id, nome, email e senha
refeições: nome, descrição, data completa, dentro ou fora da dieta e id do usuário
