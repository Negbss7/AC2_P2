# Guia dos 22 prints obrigatorios

**Estes prints devem ser tirados no Postman enquanto a API e o MongoDB estiverem rodando.** Cada imagem deve mostrar metodo, URL, Body quando houver, status HTTP e JSON da resposta. Nao envie imagem de erro de conexao.

Importe a colecao JSON que esta na pasta `postman` e siga a ordem de 01 a 22.

## Sucessos (pasta `sucesso`)

| Numero | Arquivo para salvar | Metodo / URL | HTTP |
|---|---|---|---|
| 01 | `01-listar-alunos.png` | GET `/alunos` | 200 |
| 02 | `02-buscar-aluno.png` | GET `/alunos/1` | 200 |
| 03 | `03-listar-disciplinas.png` | GET `/alunos/1/disciplinas` | 200 |
| 04 | `04-filtrar-nome.png` | GET `/alunos?nome=jo` | 200 |
| 05 | `05-cadastrar-aluno.png` | POST `/alunos` (RA 4) | 201 |
| 06 | `06-atualizar-aluno.png` | PUT `/alunos/4` | 200 |
| 07 | `07-excluir-aluno.png` | DELETE `/alunos/4` | 200 |
| 08 | `08-adicionar-disciplina.png` | POST `/alunos/1/disciplinas` (FIS101) | 201 |
| 09 | `09-atualizar-disciplina.png` | PUT `/alunos/1/disciplinas/FIS101` | 200 |
| 10 | `10-excluir-disciplina.png` | DELETE `/alunos/1/disciplinas/FIS101` | 200 |
| 11 | `11-filtrar-disciplina.png` | GET `/alunos?disciplina=MAT101` | 200 |
| 12 | `12-resumo-aluno.png` | GET `/alunos/1/resumo` | 200 |

## Erros (pasta `erros`)

| Numero | Arquivo para salvar | Metodo / URL | HTTP |
|---|---|---|---|
| 13 | `13-ra-duplicado.png` | POST `/alunos` (RA 1) | 409 |
| 14 | `14-nome-obrigatorio.png` | POST `/alunos` (sem nome) | 400 |
| 15 | `15-consultar-ra-inexistente.png` | GET `/alunos/999` | 404 |
| 16 | `16-atualizar-ra-inexistente.png` | PUT `/alunos/999` | 404 |
| 17 | `17-excluir-ra-inexistente.png` | DELETE `/alunos/999` | 404 |
| 18 | `18-disciplina-duplicada.png` | POST `/alunos/1/disciplinas` (MAT101) | 409 |
| 19 | `19-disciplina-ra-inexistente.png` | POST `/alunos/999/disciplinas` | 404 |
| 20 | `20-professor-obrigatorio.png` | POST `/alunos/1/disciplinas` (sem professor) | 400 |
| 21 | `21-atualizar-disciplina-inexistente.png` | PUT `/alunos/1/disciplinas/XYZ999` | 404 |
| 22 | `22-excluir-disciplina-inexistente.png` | DELETE `/alunos/1/disciplinas/XYZ999` | 404 |

### Como tirar cada print

1. Selecione a requisicao pelo numero na colecao do Postman.
2. Confira a URL e o corpo JSON (se for POST ou PUT).
3. Clique em **Send**.
4. Expanda a area de resposta ate aparecerem o **status** e o **JSON**.
5. Tire uma captura da janela (Windows: `Win + Shift + S`).
6. Salve como `.png` na pasta indicada pelo numero.

**Dica:** com a colecao importada, cada requisicao inclui um teste automatico que compara o HTTP recebido com o esperado. Ainda assim, voce precisa salvar os prints reais para a nota.
