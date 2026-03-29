// src/services/notasService.js
const db = require('../config/database');

class NotasService {
    // ... (mantenha o registrarNota que você já fez)

    async atualizar(id, n) {
        const query = `
            UPDATE notas SET 
                disciplina_id = $1, nome_disciplina = $2, 
                nota_final = $3, sub_nota = $4, em_recuperacao = $5
            WHERE id = $6 RETURNING *;
        `;
        const valores = [
            n.disciplina_id, n.nome_disciplina, n.nota_final, 
            JSON.stringify(n.sub_nota), n.em_recuperacao, id
        ];
        const { rows } = await db.query(query, valores);
        return rows[0];
    }

    async excluir(id) {
        await db.query('DELETE FROM notas WHERE id = $1', [id]);
    }

    async buscarPorAluno(aluno_id) {
        const { rows } = await db.query('SELECT * FROM notas WHERE aluno_id = $1', [aluno_id]);
        return rows;
    }
}
module.exports = new NotasService();