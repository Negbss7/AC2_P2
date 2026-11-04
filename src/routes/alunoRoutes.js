const express = require('express');
const controller = require('../controllers/alunoController');

const router = express.Router();

router.get('/', controller.listarAlunos);
router.post('/', controller.cadastrarAluno);
router.get('/:ra/resumo', controller.resumoAluno);
router.get('/:ra/disciplinas', controller.listarDisciplinas);
router.post('/:ra/disciplinas', controller.adicionarDisciplina);
router.put('/:ra/disciplinas/:codigo', controller.atualizarDisciplina);
router.delete('/:ra/disciplinas/:codigo', controller.excluirDisciplina);
router.get('/:ra', controller.consultarAluno);
router.put('/:ra', controller.atualizarAluno);
router.delete('/:ra', controller.excluirAluno);

module.exports = router;
