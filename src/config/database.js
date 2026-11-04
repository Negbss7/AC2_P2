const mongoose = require('mongoose');

async function conectarBanco() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error('Configure MONGODB_URI no arquivo .env');
  }

  await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
  console.log('MongoDB conectado com sucesso!');
}

module.exports = conectarBanco;
