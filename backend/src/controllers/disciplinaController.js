const disciplinaService = require('../services/disciplinaService');

class DisciplinaController {
    async postFO(req, res) {
        try {
            const { aluno_id, tipo, descricao } = req.body;
            await disciplinaService.registrarFO(aluno_id, tipo, descricao);
            res.status(201).json({ mensagem: 'FO registrada!' });
        } catch (err) {
            res.status(500).json({ erro: err.message });
        }
    }

    async postPunicao(req, res) {
        try {
            await disciplinaService.registrarPunicao(req.body);
            res.status(201).json({ mensagem: 'Punição registrada!' });
        } catch (err) {
            res.status(500).json({ erro: err.message });
        }
    }

    async getHistorico(req, res) {
        try {
            const historico = await disciplinaService.buscarHistorico(req.params.aluno_id);
            res.json(historico);
        } catch (err) {
            res.status(500).json({ erro: err.message });
        }
    }
}
module.exports = new DisciplinaController();