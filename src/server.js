require('dotenv').config();
const conectarBanco = require('./config/database');
const Aluno = require('./models/Aluno');
const app = require('./app');

async function iniciar() {
  try {
    await conectarBanco();
    await Aluno.init(); // Garante que o indice unico de RA esteja pronto.
    const porta = process.env.PORT || 3000;
    app.listen(porta, () => {
      console.log(`API disponivel em http://localhost:${porta}`);
    });
  } catch (erro) {
    console.error('Nao foi possivel iniciar:', erro.message);
    process.exit(1);
  }
}

iniciar();
