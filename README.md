# Projeto Escola – API REST com Node.js e MongoDB

## Sobre o projeto

Neste trabalho, desenvolvi uma API REST para gerenciar alunos e suas disciplinas, utilizando Node.js, Express e MongoDB.

A ideia do projeto é permitir o cadastro de alunos, a consulta das informações, a atualização de dados e a exclusão de registros. Também é possível adicionar, alterar e remover as disciplinas de cada aluno.

Utilizei o MongoDB para armazenar as informações, pois assim os dados continuam salvos mesmo depois que a aplicação é encerrada.

## 1. Tecnologias utilizadas

Para desenvolver o projeto, utilizei:

- **Node.js:** para executar o JavaScript no servidor.
- **Express:** para criar as rotas e organizar as requisições da API.
- **MongoDB:** para armazenar os dados dos alunos e disciplinas.
- **Mongoose:** para facilitar a comunicação com o banco.
- **Postman:** para testar as funcionalidades e verificar as respostas.

Também utilizei o VS Code para desenvolver e organizar os arquivos do projeto.

## 2. Como instalar e configurar

Para executar o projeto, é necessário ter o Node.js instalado e acesso a um banco MongoDB, que pode ser local ou pelo MongoDB Atlas.

Primeiro, abra a pasta do projeto no VS Code e execute no terminal:

```bash
npm install
```

Esse comando instala as dependências utilizadas na aplicação.

Depois, crie um arquivo chamado `.env` na pasta principal, usando o `.env.example` como referência.

Para utilizar um MongoDB instalado no computador:

```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/projeto_escola
```

Caso utilize o MongoDB Atlas, basta substituir o endereço pela conexão do seu banco.

O arquivo `.env` não deve ser enviado ao GitHub, pois pode conter informações privadas, como usuário e senha.

## 3. Cadastro dos alunos iniciais

Para começar os testes, preparei três alunos que são cadastrados no MongoDB.

| RA | Nome | Disciplinas |
|---|---|---|
| 1 | João | Matemática e História |
| 2 | Maria | Matemática e Biologia |
| 3 | Pedro | Geografia |

Para cadastrar esses alunos, execute:

```bash
npm run seed
```

Esse comando verifica se os alunos já existem antes de cadastrá-los, evitando que os mesmos registros sejam criados novamente.

## 4. Como executar a API

Depois de configurar o banco de dados, execute:

```bash
npm start
```

Se estiver tudo correto, o terminal informará que o MongoDB foi conectado e que a API está funcionando.

Para conferir, basta acessar:

http://localhost:3000/alunos

Essa rota mostra os alunos cadastrados no banco.

Também é possível utilizar:

```bash
npm run dev
```

Esse comando é útil durante o desenvolvimento, pois reinicia a aplicação automaticamente quando o código é alterado.

## 5. Funcionalidades da API

Durante o desenvolvimento, implementei as operações necessárias para gerenciar os alunos e suas disciplinas.

| Método | Rota | Funcionalidade |
|---|---|---|
| GET | `/alunos` | Listar todos os alunos |
| GET | `/alunos/:ra` | Buscar um aluno pelo RA |
| GET | `/alunos/:ra/disciplinas` | Consultar as disciplinas |
| GET | `/alunos?nome=jo` | Pesquisar pelo nome |
| GET | `/alunos?disciplina=MAT101` | Filtrar por disciplina |
| GET | `/alunos/:ra/resumo` | Consultar o resumo do aluno |
| POST | `/alunos` | Cadastrar um aluno |
| PUT | `/alunos/:ra` | Atualizar o nome |
| DELETE | `/alunos/:ra` | Excluir um aluno |
| POST | `/alunos/:ra/disciplinas` | Adicionar uma disciplina |
| PUT | `/alunos/:ra/disciplinas/:codigo` | Atualizar uma disciplina |
| DELETE | `/alunos/:ra/disciplinas/:codigo` | Excluir uma disciplina |

Cada rota tem uma função específica. Por exemplo, o método GET é utilizado para consultar informações, enquanto o POST permite realizar novos cadastros.

### Exemplo de cadastro de aluno

Para cadastrar um aluno no Postman, utilize o método `POST` com o endereço:

```text
http://localhost:3000/alunos
```

No Body, selecione a opção JSON e informe os dados:

```json
{
  "ra": "5",
  "nome": "Lucas",
  "disciplinas": [
    {
      "codigo": "ING101",
      "nome": "Inglês",
      "professor": "Prof. Paula"
    }
  ]
}
```

Se o cadastro for realizado corretamente e o RA ainda não existir, a API retorna o status `201 Created`.

## 6. Validações e tratamento de erros

Além das funcionalidades principais, também implementei algumas validações para evitar problemas nos cadastros.

Por exemplo, não é possível cadastrar dois alunos com o mesmo RA, nem adicionar duas disciplinas com o mesmo código para um único aluno.

Também fiz verificações para garantir que os campos obrigatórios sejam preenchidos.

Para identificar o resultado de cada requisição, utilizei os seguintes códigos HTTP:

| Código | Significado |
|---|---|
| 200 | Oper