const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const visitasController = require('../controllers/visitasController');

router.post('/', authMiddleware, visitasController.criar);

module.exports = router;