const db = require('../config/database');

class FaltasService {
    async registrarFalta(aluno_id, tipo, motivos, pontos_perdidos, data_falta) {
        await db.query(
            'INSERT INTO faltas (aluno_id, tipo, motivos, pontos_perdidos, data_falta) VALUES ($1, $2, $3, $4, $5)',
            [aluno_id, tipo, motivos, pontos_perdidos, data_falta]
        );
    }
    async listarPorAluno(aluno_id) {
        const { rows } = await db.query('SELECT * FROM faltas WHERE aluno_id = $1 ORDER BY data_falta DESC', [aluno_id]);
        return rows;
    }
}

module.exports = new FaltasService();