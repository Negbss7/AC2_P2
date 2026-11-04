require('dotenv').config();
const mongoose = require('mongoose');
const conectarBanco = require('../config/database');
const Aluno = require('../models/Aluno');

const alunosIniciais = [
  {
    ra: '1', nome: 'João', disciplinas: [
      { codigo: 'MAT101', nome: 'Matemática', professor: 'Prof. Carlos' },
      { codigo: 'HIS101', nome: 'História', professor: 'Prof. Ana' }
    ]
  },
  {
    ra: '2', nome: 'Maria', disciplinas: [
      { codigo: 'MAT101', nome: 'Matemática', professor: 'Prof. Carlos' },
      { codigo: 'BIO101', nome: 'Biologia', professor: 'Prof. Carla' }
    ]
  },
  {
    ra: '3', nome: 'Pedro', disciplinas: [
      { codigo: 'GEO101', nome: 'Geografia', professor: 'Prof. Bruno' }
    ]
  }
];

async function seed() {
  try {
    await conectarBanco();
    await Aluno.init();

    // Insere somente os alunos que ainda nao existem: nao apaga registros.
    for (const aluno of alunosIniciais) {
      await Aluno.updateOne({ ra: aluno.ra }, { $setOnInsert: aluno }, { upsert: true });
    }

    console.log('Dados iniciais verificados: RA 1, 2 e 3.');
    console.log(`Total de alunos no banco: ${await Aluno.countDocuments()}`);
  } catch (erro) {
    console.error('Erro ao cadastrar dados iniciais:', erro.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seed();
