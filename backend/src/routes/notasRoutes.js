const express = require('express');
const router = express.Router();
const notaController = require('../controllers/notaController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, notaController.registrarNota);
router.get('/aluno/:aluno_id', authMiddleware, notaController.buscarPorAluno);
router.put('/:id', authMiddleware, notaController.atualizar);
router.delete('/:id', authMiddleware, notaController.excluir);

module.exports = router;