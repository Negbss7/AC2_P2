const Aluno = require('../models/Aluno');
const ApiError = require('../utils/ApiError');
const {
  textoObrigatorio,
  codigoObrigatorio,
  validarDisciplina,
  validarListaDisciplinas,
  escaparRegex
} = require('../utils/validacao');

function raDaRota(req) {
  return textoObrigatorio(req.params.ra, 'ra');
}

async function buscarAluno(ra) {
  const aluno = await Aluno.findOne({ ra }).select('-_id').lean();
  if (!aluno) throw new ApiError(404, 'Aluno nao encontrado');
  return aluno;
}

// GET /alunos | GET /alunos?nome=jo | GET /alunos?disciplina=MAT101
async function listarAlunos(req, res) {
  const filtros = {};

  if (req.query.nome !== undefined) {
    const nome = textoObrigatorio(req.query.nome, 'nome');
    filtros.nome = { $regex: escaparRegex(nome), $options: 'i' };
  }

  if (req.query.disciplina !== undefined) {
    filtros['disciplinas.codigo'] = codigoObrigatorio(req.query.disciplina);
  }

  const alunos = await Aluno.find(filtros).select('-_id').sort({ ra: 1 }).lean();
  res.status(200).json(alunos);
}

// GET /alunos/:ra
async function consultarAluno(req, res) {
  res.status(200).json(await buscarAluno(raDaRota(req)));
}

// GET /alunos/:ra/disciplinas
async function listarDisciplinas(req, res) {
  const aluno = await buscarAluno(raDaRota(req));
  res.status(200).json(aluno.disciplinas);
}

// POST /alunos
async function cadastrarAluno(req, res) {
  const corpo = req.body || {};
  const ra = textoObrigatorio(corpo.ra, 'ra');
  const nome = textoObrigatorio(corpo.nome, 'nome');
  const disciplinas = validarListaDisciplinas(corpo.disciplinas);

  const aluno = await Aluno.create({ ra, nome, disciplinas });
  res.status(201).json({ ra: aluno.ra, nome: aluno.nome, disciplinas: aluno.disciplinas });
}

// PUT /alunos/:ra (apenas nome)
async function atualizarAluno(req, res) {
  const ra = raDaRota(req);
  const nome = textoObrigatorio(req.body?.nome, 'nome');
  const aluno = await Aluno.findOneAndUpdate(
    { ra },
    { $set: { nome } },
    { new: true, runValidators: true, projection: { _id: 0 } }
  ).lean();
  if (!aluno) throw new ApiError(404, 'Aluno nao encontrado');
  res.status(200).json(aluno);
}

// DELETE /alunos/:ra
async function excluirAluno(req, res) {
  const ra = raDaRota(req);
  const aluno = await Aluno.findOneAndDelete({ ra });
  if (!aluno) throw new ApiError(404, 'Aluno nao encontrado');
  res.status(200).json({ mensagem: 'Aluno excluido com sucesso' });
}

// POST /alunos/:ra/disciplinas
async function adicionarDisciplina(req, res) {
  const ra = raDaRota(req);
  const disciplina = validarDisciplina(req.body);

  // A verificacao e o cadastro acontecem numa unica operacao no MongoDB.
  const aluno = await Aluno.findOneAndUpdate(
    { ra, 'disciplinas.codigo': { $ne: disciplina.codigo } },
    { $push: { disciplinas: disciplina } },
    { new: true, runValidators: true, projection: { _id: 0 } }
  ).lean();

  if (!aluno) {
    const existe = await Aluno.exists({ ra });
    if (!existe) throw new ApiError(404, 'Aluno nao encontrado');
    throw new ApiError(409, 'Disciplina duplicada para este aluno');
  }

  res.status(201).json(aluno);
}

// PUT /alunos/:ra/disciplinas/:codigo (codigo nao muda)
async function atualizarDisciplina(req, res) {
  const ra = raDaRota(req);
  const codigo = codigoObrigatorio(req.params.codigo);
  const nome = textoObrigatorio(req.body?.nome, 'nome da disciplina');
  const professor = textoObrigatorio(req.body?.professor, 'professor');

  const aluno = await Aluno.findOneAndUpdate(
    { ra, 'disciplinas.codigo': codigo },
    { $set: { 'disciplinas.$.nome': nome, 'disciplinas.$.professor': professor } },
    { new: true, runValidators: true, projection: { _id: 0 } }
  ).lean();

  if (!aluno) {
    if (!(await Aluno.exists({ ra }))) throw new ApiError(404, 'Aluno nao encontrado');
    throw new ApiError(404, 'Disciplina nao encontrada');
  }
  res.status(200).json(aluno.disciplinas.find((item) => item.codigo === codigo));
}

// DELETE /alunos/:ra/disciplinas/:codigo
async function excluirDisciplina(req, res) {
  const ra = raDaRota(req);
  const codigo = codigoObrigatorio(req.params.codigo);
  const aluno = await Aluno.findOneAndUpdate(
    { ra, 'disciplinas.codigo': codigo },
    { $pull: { disciplinas: { codigo } } },
    { new: true, projection: { _id: 0 } }
  ).lean();

  if (!aluno) {
    if (!(await Aluno.exists({ ra }))) throw new ApiError(404, 'Aluno nao encontrado');
    throw new ApiError(404, 'Disciplina nao encontrada');
  }
  res.status(200).json({ mensagem: 'Disciplina excluida com sucesso' });
}

// GET /alunos/:ra/resumo
async function resumoAluno(req, res) {
  const aluno = await buscarAluno(raDaRota(req));
  const professores = [...new Set(aluno.disciplinas.map((item) => item.professor))];
  res.status(200).json({
    ra: aluno.ra,
    nome: aluno.nome,
    totalDisciplinas: aluno.disciplinas.length,
    professores
  });
}

module.exports = {
  listarAlunos,
  consultarAluno,
  listarDisciplinas,
  cadastrarAluno,
  atualizarAluno,
  excluirAluno,
  adicionarDisciplina,
  atualizarDisciplina,
  excluirDisciplina,
  resumoAluno
};
