const db = require("../config/database");

class DisciplinaService {
  async registrarFO(dados) {
    const {
      aluno_id,
      data_ocorrencia,
      descricao,
      tipo_ocorrencia,
      usuario_id,
    } = dados;

    const query = `
        INSERT INTO ocorrencias (aluno_id, data_ocorrencia, descricao, tipo_ocorrencia, usuario_id)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
    `;

    const valores = [
      aluno_id,
      data_ocorrencia,
      descricao,
      tipo_ocorrencia,
      usuario_id,
    ];
    const resultado = await db.query(query, valores);
    return resultado.rows[0];
  }

  async registrarPunicao(p) {
    await db.query(
      `INSERT INTO punicoes (aluno_id, tipo_punicao, dias, motivo, pontos_perdidos, data_punicao) 
             VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        p.aluno_id,
        p.tipo_punicao,
        p.dias,
        p.motivo,
        p.pontos_perdidos,
        p.data_punicao,
      ],
    );
  }

  async buscarHistorico(aluno_id) {
    const fos = await db.query(
      "SELECT * FROM fos WHERE aluno_id = $1 ORDER BY data_registro DESC",
      [aluno_id],
    );
    const punicoes = await db.query(
      "SELECT * FROM punicoes WHERE aluno_id = $1 ORDER BY data_punicao DESC",
      [aluno_id],
    );
    return { fos: fos.rows, punicoes: punicoes.rows };
  }
}
module.exports = new DisciplinaService();
