const express = require('express');
const router = express.Router();
const alunoController = require('../controllers/alunoController');

// Rotas apontando para as funções do Controller
router.post('/', alunoController.cadastrar);
router.get('/', alunoController.listar);

module.exports = router;