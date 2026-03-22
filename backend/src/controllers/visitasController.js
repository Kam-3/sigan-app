const visitarService = require('../services/visitarService');

class VisitasController { 
    async postVisita(req, res) {
        try {
            const { aluno_id, nome_medico, motivo, convalescenca, dias_convalescenca, observacao_medica, data_visita, hora_visita } = req.body;
            await visitarService.registrarVisita(aluno_id, nome_medico, motivo, convalescenca, dias_convalescenca, observacao_medica, data_visita, hora_visita);
            res.status(201).json({ mensagem: 'Visita registrada!' });
        } catch (err) {
            res.status(500).json({ erro: err.message });
        }
    }
}