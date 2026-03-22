const faltasService = require('../config/services/faltasService');

class FaltasController {
    async criar(req, res) {
        try {
            const falta = await faltasService.registrar(req.body);
            res.status(201).json(falta);
        } catch (err) {
            res.status(500).json({ erro: err.message });
        }
    }
    async listar(req, res) {
        try {
            const lista = await faltasService.listarPorAluno(req.params.aluno_id);
            res.json(lista);
        } catch (err) {
            res.status(500).json({ erro: err.message });
        }
    }
}

module.exports = new FaltasController();