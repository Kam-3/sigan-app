const express = require('express');
const router = express.Router();
const notaController = require('../controllers/notaController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, notaController.registrarNota);
router.get('/aluno/:aluno_id', authMiddleware, notaController.listarNotasPorAluno);
router.put('/:id', authMiddleware, notaController.atualizarNota);
router.delete('/:id', authMiddleware, notaController.deletarNota);

module.exports = router;