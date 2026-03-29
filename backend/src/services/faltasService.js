const db = require('../config/database');

class FaltasService {
    async registrarFalta(f) {
        const query = `
            INSERT INTO faltas (aluno_id, tipo, motivos, pontos_perdidos, data_falta) 
            VALUES ($1, $2, $3, $4, $5) 
            RETURNING *; -- Essencial para o Controller receber os dados de volta
        `;
        
        const valores = [f.aluno_id, f.tipo, f.motivos, f.pontos_perdidos, f.data_falta];
        
        const { rows } = await db.query(query, valores);
        return rows[0];
    }
    async listarPorAluno(aluno_id) {
        const { rows } = await db.query('SELECT * FROM faltas WHERE aluno_id = $1 ORDER BY data_falta DESC', [aluno_id]);
        return rows;
    }
}

module.exports = new FaltasService();