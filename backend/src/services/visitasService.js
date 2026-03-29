const db = require('../config/database');

class VisitasService {
    async registrar(v) {
        const query = `
            INSERT INTO visitas_medica 
            (aluno_id, nome_medico, motivo, convalescenca, dias_convalescenca, observacao_medica, data_visita, hora_visita) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
            RETURNING *;
        `;
        const valores = [
            v.aluno_id, v.nome_medico, v.motivo, v.convalescenca, 
            v.dias_convalescenca, v.observacao_medica, v.data_visita, v.hora_visita
        ];
        const { rows } = await db.query(query, valores);
        return rows[0];
    }

    async listarPorAluno(aluno_id) {
        const { rows } = await db.query(
            'SELECT * FROM visita_medica WHERE aluno_id = $1 ORDER BY data_visita DESC', 
            [aluno_id]
        );
        return rows;
    }
}

module.exports = new VisitasService();