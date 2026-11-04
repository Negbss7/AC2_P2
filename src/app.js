const express = require('express');
const alunoRoutes = require('./routes/alunoRoutes');
const { rotaInexistente, tratarErros } = require('./middlewares/errorHandler');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ mensagem: 'API Escola funcionando', rotas: '/alunos' });
});

app.use('/alunos', alunoRoutes);
app.use(rotaInexistente);
app.use(tratarErros);

module.exports = app;
