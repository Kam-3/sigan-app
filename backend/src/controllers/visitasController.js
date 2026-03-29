const visitasService = require('../services/visitasService');

class VisitasController { 
    async criar(req, res) {
        try {
            // Passamos o req.body inteiro para o service
            const novaVisita = await visitasService.registrar(req.body);
            
            res.status(201).json({ 
                mensagem: 'Visita registrada com sucesso!',
                dados: novaVisita 
            });
        } catch (err) {
            res.status(500).json({ erro: err.message });
        }
    }
}

module.exports = new VisitasController();