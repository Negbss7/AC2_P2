const ApiError = require('./ApiError');

function textoObrigatorio(valor, campo) {
  if (typeof valor !== 'string' || valor.trim() === '') {
    throw new ApiError(400, `Campo obrigatorio: ${campo}`);
  }
  return valor.trim();
}

function codigoObrigatorio(valor) {
  return textoObrigatorio(valor, 'codigo').toUpperCase();
}

function validarDisciplina(entrada) {
  if (!entrada || typeof entrada !== 'object' || Array.isArray(entrada)) {
    throw new ApiError(400, 'Informe uma disciplina valida');
  }
  return {
    codigo: codigoObrigatorio(entrada.codigo),
    nome: textoObrigatorio(entrada.nome, 'nome da disciplina'),
    professor: textoObrigatorio(entrada.professor, 'professor')
  };
}

function validarListaDisciplinas(valor) {
  if (valor === undefined) return [];
  if (!Array.isArray(valor)) {
    throw new ApiError(400, 'Disciplinas deve ser uma lista');
  }

  const disciplinas = valor.map(validarDisciplina);
  const codigos = disciplinas.map((disciplina) => disciplina.codigo);
  if (new Set(codigos).size !== codigos.length) {
    throw new ApiError(409, 'Disciplina duplicada para este aluno');
  }
  return disciplinas;
}

function escaparRegex(texto) {
  return texto.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

module.exports = {
  textoObrigatorio,
  codigoObrigatorio,
  validarDisciplina,
  validarListaDisciplinas,
  escaparRegex
};
