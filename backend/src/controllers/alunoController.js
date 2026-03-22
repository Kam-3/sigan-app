const alunoService = require('../services/alunoService');

class AlunoController {
    async cadastrar(req, res) {
        try {
            const novoAluno = await alunoService.cadastrar(req.body);
            res.status(201).json({ 
                mensagem: 'Militar cadastrado com sucesso!', 
                id: novoAluno.id 
            });
        } catch (error) {
            console.error('Erro no Controller:', error);
            res.status(500).json({ erro: 'Falha ao processar cadastro de aluno.' });
        }
    }

    async listar(req, res) {
        try {
            const alunos = await alunoService.listarTodos();
            res.json(alunos);
        } catch (error) {
            res.status(500).json({ erro: 'Erro ao buscar lista de alunos.' });
        }
    }
}

module.exports = new AlunoController();