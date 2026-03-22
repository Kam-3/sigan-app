const notasService = require('../config/services/notasService');

class NotasController {
    async registrarNota(req, res) {
        try {
            // Verificação básica: o aluno_id foi enviado?
            if (!req.body.aluno_id) {
                return res.status(400).json({ erro: "ID do aluno é obrigatório!" });
            }

            const novaNota = await notasService.registrarNota(req.body);
            res.status(201).json({ 
                mensagem: 'Nota registrada com sucesso!',
                dados: novaNota 
            });
        } catch (err) {
            res.status(500).json({ erro: err.message });
        }
    }
}

module.exports = new NotaController();