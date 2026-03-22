const express = require('express');
const router = express.Router();
const disciplinaController = require('../controllers/disciplinaController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/fos', authMiddleware, disciplinaController.postFO);
router.post('/punicoes', authMiddleware, disciplinaController.postPunicao);
router.get('/historico/:aluno_id', authMiddleware, disciplinaController.getHistorico);

module.exports = router;