# Preparação para a Pergunta Técnica

Este documento reúne algumas explicações sobre o projeto que desenvolvi utilizando Node.js, Express e MongoDB. A ideia é mostrar como a API funciona e explicar as principais funcionalidades que foram implementadas.

## 1. O que é uma API REST?

Uma API REST é uma forma de fazer sistemas se comunicarem. No meu projeto, ela permite consultar, cadastrar, alterar e excluir alunos e disciplinas por meio de requisições HTTP. As informações são enviadas e recebidas em formato JSON.

## 2. Para que servem os métodos HTTP?

Utilizei quatro métodos principais:

- **GET:** para buscar informações dos alunos e disciplinas.
- **POST:** para cadastrar novos alunos ou adicionar disciplinas.
- **PUT:** para atualizar informações que já estão cadastradas.
- **DELETE:** para excluir alunos ou disciplinas.

Cada método tem sua função dentro da API.

## 3. Por que utilizar MongoDB em vez de arrays?

Utilizei o MongoDB porque precisava que os dados ficassem salvos mesmo depois de fechar o programa.

Se utilizasse apenas arrays em memória, perderia as informações ao reiniciar a aplicação. Com o MongoDB, os alunos e suas disciplinas continuam armazenados no banco.

## 4. Qual é a função do Mongoose?

O Mongoose ajuda a fazer a conexão entre o Node.js e o MongoDB.

Também utilizei ele para definir como os dados dos alunos seriam organizados, incluindo RA, nome e disciplinas. Isso facilita o cadastro e a consulta das informações.

## 5. Como o projeto impede RA duplicado?

No projeto, configurei o campo RA para ser único, já que cada aluno precisa ter uma identificação diferente.

Quando alguém tenta cadastrar um RA que já existe, a API não permite o cadastro e retorna o erro 409, informando que aquele RA já está cadastrado.

## 6. Como o projeto impede disciplinas duplicadas?

Antes de adicionar uma disciplina, a API verifica se o aluno já possui alguma disciplina com aquele código.

Se o código já estiver cadastrado para o mesmo aluno, a API retorna um erro e não adiciona novamente. Isso evita disciplinas repetidas.

## 7. O que significam os códigos HTTP?

Os códigos HTTP mostram se a requisição funcionou ou se aconteceu algum problema.

- **200:** a operação foi realizada com sucesso.
- **201:** um novo aluno ou disciplina foi cadastrado.
- **400:** alguma informação obrigatória está faltando ou está incorreta.
- **404:** o aluno ou a disciplina não foi encontrado.
- **409:** já existe um cadastro com aquele RA ou código de disciplina.

Utilizei esses códigos para facilitar a identificação dos resultados e dos erros durante os testes.

## 8. Como funciona o filtro por nome?

Criei um filtro que permite pesquisar alunos usando apenas uma parte do nome.

Por exemplo, ao pesquisar "jo", a API consegue encontrar o aluno João.

A pesquisa também funciona sem diferenciar letras maiúsculas de minúsculas, facilitando a busca.

## 9. Como funciona o resumo do aluno?

O resumo permite consultar as principais informações de um aluno em uma única requisição.

Ele mostra o RA, o nome, a quantidade de disciplinas e os professores responsáveis.

Também utilizei o Set para evitar que o mesmo professor apareça mais de uma vez na lista.

## 10. Como organizei o projeto?

Separei o projeto em pastas para deixar o código mais organizado e facilitar a manutenção.

- **Routes:** ficam as rotas utilizadas para acessar as funcionalidades.
- **Controllers:** ficam as funções responsáveis pelas operações da API.
- **Models:** define a estrutura dos dados armazenados no MongoDB.
- **Config:** contém a configuração da conexão com o banco.
- **Middlewares:** ajuda no tratamento dos erros.
- **Scripts:** contém o código utilizado para cadastrar os três alunos iniciais.

Essa divisão facilita encontrar cada parte do código e fazer alterações quando necessário.

## Explicação geral do projeto

Neste trabalho, desenvolvi uma API para gerenciar alunos e suas disciplinas usando Node.js, Express e MongoDB.

A API permite cadastrar alunos, consultar suas informações, atualizar nomes, excluir registros e gerenciar as disciplinas de cada um.

Também implementei algumas validações, como impedir alunos com RA repetido, evitar disciplinas duplicadas e verificar se os campos obrigatórios foram preenchidos.

Utilizei o MongoDB para armazenar os dados e o Postman para testar as funcionalidades. Fiz testes tanto das operações que funcionam normalmente quanto das situações de erro, para verificar se a API retornava as respostas corretas.

Com essa atividade, consegui entender melhor como funciona uma API REST, como organizar o código e como fazer a comunicação com um banco de dados.