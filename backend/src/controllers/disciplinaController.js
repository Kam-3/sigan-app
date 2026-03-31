const disciplinaService = require("../services/disciplinaService");

class DisciplinaController {
  async postFO(req, res) {
    try {
      // Extraímos os dados que virão do formulário no Frontend
      const {
        aluno_id,
        data_ocorrencia,
        descricao,
        tipo_ocorrencia,
        usuario_id,
      } = req.body;

      // Chamamos o serviço para salvar no banco
      const novaOcorrencia = await disciplinaService.registrarFO({
        aluno_id,
        data_ocorrencia,
        descricao,
        tipo_ocorrencia,
        usuario_id,
      });

      res.status(201).json({
        mensagem: "Ocorrência (FO) registrada com sucesso!",
        dados: novaOcorrencia,
      });
    } catch (err) {
      console.error("Erro no postFO:", err.message);
      res
        .status(500)
        .json({ erro: "Falha ao registrar ocorrência: " + err.message });
    }
  }

  async postPunicao(req, res) {
    try {
      await disciplinaService.registrarPunicao(req.body);
      res.status(201).json({ mensagem: "Punição registrada!" });
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  }

  async getHistorico(req, res) {
    try {
      const historico = await disciplinaService.buscarHistorico(
        req.params.aluno_id,
      );
      res.json(historico);
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  }
}
module.exports = new DisciplinaController();
