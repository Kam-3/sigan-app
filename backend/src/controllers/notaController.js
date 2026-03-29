const notasService = require('../services/notasService');

class NotasController {
    // 1. Função para Criar Nota
    async registrarNota(req, res) {
        try {
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

    // 2. Função para Buscar por Aluno (A que causou o erro na linha 7!)
    async buscarPorAluno(req, res) {
        try {
            const { aluno_id } = req.params;
            const notas = await notasService.buscarPorAluno(aluno_id);
            res.json(notas);
        } catch (err) {
            res.status(500).json({ erro: 'Erro ao buscar notas do aluno.' });
        }
    }

    // 3. Função para Atualizar
    async atualizar(req, res) {
        try {
            const { id } = req.params;
            const notaAtualizada = await notasService.atualizar(id, req.body);
            res.json(notaAtualizada);
        } catch (err) {
            res.status(500).json({ erro: 'Erro ao atualizar nota.' });
        }
    }

    // 4. Função para Excluir
    async excluir(req, res) {
        try {
            const { id } = req.params;
            await notasService.excluir(id);
            res.json({ mensagem: 'Nota excluída com sucesso!' });
        } catch (err) {
            res.status(500).json({ erro: 'Erro ao excluir nota.' });
        }
    }
}

// IMPORTANTE: Exportar com o mesmo nome da classe
module.exports = new NotasController();