const mongoose = require('mongoose');

function rotaInexistente(req, res) {
  res.status(404).json({ erro: 'Rota nao encontrada' });
}

function tratarErros(err, req, res, next) {
  // JSON malformado na requisicao.
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ erro: 'JSON invalido' });
  }

  // O indice unique de RA no MongoDB impede cadastros duplicados.
  if (err.code === 11000) {
    return res.status(409).json({ erro: 'RA ja cadastrado' });
  }

  if (err instanceof mongoose.Error.ValidationError || err instanceof mongoose.Error.CastError) {
    return res.status(400).json({ erro: 'Dados invalidos: ' + err.message });
  }

  if (err.status && err.status >= 400 && err.status < 500) {
    return res.status(err.status).json({ erro: err.message });
  }

  console.error('Erro inesperado:', err);
  return res.status(500).json({ erro: 'Erro interno do servidor' });
}

module.exports = { rotaInexistente, tratarErros };
