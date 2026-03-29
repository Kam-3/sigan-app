const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const faltasController = require('../controllers/faltasController');

router.post('/', authMiddleware, faltasController.criar);
router.get('/:aluno_id', authMiddleware, faltasController.listar);

module.exports = router;