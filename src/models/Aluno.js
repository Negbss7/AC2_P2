const mongoose = require('mongoose');

const disciplinaSchema = new mongoose.Schema(
  {
    codigo: { type: String, required: true, trim: true, uppercase: true },
    nome: { type: String, required: true, trim: true },
    professor: { type: String, required: true, trim: true }
  },
  { _id: false }
);

const alunoSchema = new mongoose.Schema(
  {
    ra: { type: String, required: true, trim: true, unique: true },
    nome: { type: String, required: true, trim: true },
    disciplinas: { type: [disciplinaSchema], default: [] }
  },
  { collection: 'alunos', versionKey: false }
);

// Um RA nao pode ser repetido no banco.
// A regra de disciplinas repetidas tambem e verificada no controller.
alunoSchema.path('disciplinas').validate(function (disciplinas) {
  const codigos = disciplinas.map((item) => item.codigo?.toUpperCase());
  return new Set(codigos).size === codigos.length;
}, 'O aluno nao pode ter disciplinas com codigos repetidos.');

module.exports = mongoose.model('Aluno', alunoSchema);
