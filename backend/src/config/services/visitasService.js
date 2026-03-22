const db = require('../config/database');

class VisitasService {
    async registar(v) {
        const query = `
            INSERT INTO visitas (aluno_id, nome_medico, motivo, convalescenca, dias_convalescenca, observacao_medica, data_visita, hora_visita) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;
        `;
        const valores = [v.aluno_id, v.nome_medico, v.motivo, v.convalescenca, v.dias_convalescenca, v.observacao_medica, v.data_visita, v.hora_visita];
        const { rows } = await db.query(query, valores);
        return rows[0];
    }
}

module.exports = new VisitasService();